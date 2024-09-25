import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FacadeService } from '../../shared/services/facade.service';
import { TuiLabel } from '@taiga-ui/core';
import { TuiRadio } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiButton, TuiIcon, TuiAlertService } from '@taiga-ui/core';
import { ValidatorsService } from '../../shared/services/validators.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TuiLabel,
    TuiRadio,
    TuiInputModule,
    TuiButton,
    TuiIcon
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {

  /**
   * API a ser editada.
   */
  @Input() itemToEdit: any;

  /**
   * Formulário que armazenará as API's.
   */
  form!: FormGroup;

  /**
   * Construtor da classe.
   * @param facadeService Serviço de formulario.
   * @param validatorsService Serviço de validações.
   * @param router Serviço de rotas.
   */
  constructor(
    private readonly facadeService: FacadeService,
    private readonly validatorsService: ValidatorsService,
    private readonly router: Router
  ) { }

  /**
   * Serviço de alertas para notificações.
   */
  private readonly alerts = inject(TuiAlertService);

  /**
  * Chamada no ngOnInit para inicializar o componente.
  */
  ngOnInit(): void {
    this.initializeForm();

    this.verifyUpdateOrCreate();
  }

  /**
   * Função que verifica se deve editar ou criar um formulário.
   */
  verifyUpdateOrCreate(): void {
    if (this.itemToEdit) {
      this.populateForm(this.itemToEdit);
    }
  }

  /**
   * Função que inicializa o formulário.
   */
  initializeForm(): void {
    this.form = new FormGroup({
      alias: new FormControl('', Validators.required),
      webhook: new FormControl('', Validators.required),
      url: new FormControl('', [Validators.required, this.validatorsService.urlValidator()]),
      corpo: new FormControl(''),
      metodo: new FormControl('', Validators.required),
      cabecalho: new FormArray([])
    });
  }

  /**
   * Função que retorna o grupo de campos de formulário chamado "cabecalho".
   */
  get cabecalho(): FormArray {
    return this.form.get('cabecalho') as FormArray;
  }

  /**
   * Função que adiciona headers ao formulário.
   */
  addHeader(): void {
    const headerGroup = new FormGroup({
      propriedade: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
    });
    this.cabecalho.push(headerGroup);
  }

  /**
  * Deleta itens do header através do índice.
  * @param index Índice do header.
  */
  deleteHeader(index: number): void {
    this.cabecalho.removeAt(index);
  }

  /**
   * Função para verifica qual fluxo seguir: editar ou criar uma API.
   */
  submit(): void {
    if (this.itemToEdit) {
      this.updateItem();
    } else {
      this.createItem();
    }
  }

  /**
   * Função para adicionar uma nova API a lista.
   */
  createItem(): void {
    const $adicionarAPI = this.facadeService.set(this.form.value);
    $adicionarAPI.subscribe(() => {
      this.form.reset();
      this.showNotification('API adicionada com sucesso!');
    });
  }

  /**
   * Função para editar uma API da lista.
   */
  updateItem(): void {
    const $atualizarAPI = this.facadeService.update(this.itemToEdit._id, this.form.value);
    $atualizarAPI.subscribe(() => {
      this.router.navigate(['/list']);
      this.showNotification('API atualizada com sucesso!');
    });
  }

  /**
   * Função que preenche o formulário caso venha do editar uma API.
   * @param item Dados da API.
   */
  populateForm(item: any): void {
    this.form.patchValue({
      alias: item.alias,
      webhook: item.webhook,
      url: item.url,
      corpo: item.corpo,
      metodo: item.metodo,
    });

    this.cabecalho.clear();

    if (item.cabecalho && item.cabecalho.length > 0) {
      item.cabecalho.forEach((header: any) => {
        const headerGroup = new FormGroup({
          propriedade: new FormControl(header.propriedade, Validators.required),
          valor: new FormControl(header.valor, Validators.required),
        });
        this.cabecalho.push(headerGroup);
      });
    }
  }

  /**
   * Função que exibe uma notificação para o usuário.
   * @param message Mensagem a ser exibida.
   */
  showNotification(message: string): void {
    this.alerts
      .open(`<strong>${message}</strong>`, { appearance: 'success' })
      .subscribe();
  }
}
