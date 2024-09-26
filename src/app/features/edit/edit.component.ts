import { Component } from '@angular/core';
import { FacadeService } from '../../shared/services/facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateComponent } from "../create/create.component";
import { CommonModule } from '@angular/common';
import { FormComponent } from "../../shared/components/form/form.component";
import { ModalService } from '../../shared/services/modal.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CreateComponent, CommonModule, FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  form!: FormGroup;

  data: any;

  constructor(
    private readonly facadeService: FacadeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getData();
    // this.form = this.formService.initializeForm();
  }

  getData(): void {
    this.facadeService.get(this.id).subscribe((res) => {
      this.data = res;
    });
  }

  get id(): string {
    return this.route.snapshot.paramMap.get('id')!;
  }

    /**
   * Inicializa o formulário e carrega dados se disponíveis.
   */
  // initializeForm(): void {
  //   this.form = new FormGroup({
  //     alias: new FormControl(this.formData?.alias || '', Validators.required),
  //     webhook: new FormControl(this.formData?.webhook || '', Validators.required),
  //     url: new FormControl(
  //       this.formData?.url || '',
  //       [Validators.required, this.validatorsService.urlValidator()]
  //     ),
  //     corpo: new FormControl(this.formData?.corpo || ''),
  //     metodo: new FormControl(this.formData?.metodo || '', Validators.required),
  //     cabecalho: new FormArray([]),
  //   });

  //   if (this.formData?.cabecalho) {
  //     this.loadHeaders(this.formData.cabecalho);
  //   }

  //   this.form.valueChanges.subscribe(value => {
  //     this.formDataChange.emit(value); // Emite as mudanças no formulário
  //   });
  // }

  /**
   * Carrega os cabeçalhos no formulário.
   */
  // loadHeaders(headers: any[]): void {
  //   headers.forEach(header => {
  //     this.addHeader(header.propriedade, header.valor);
  //   });
  // }

  /**
 * Função para editar uma API da lista.
 * @param formData Dados do formulário emitidos pelo FormComponent.
 */
  handleSubmit(formData: any): void {
    const $atualizarAPI = this.facadeService.update(this.id, formData);
    $atualizarAPI.subscribe(() => {
      this.router.navigate(['/list']);
      this.modalService.showAlert('API atualizada com sucesso!');
    });
  }
}
