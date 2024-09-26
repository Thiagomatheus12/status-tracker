import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiLabel } from '@taiga-ui/core';
import { TuiRadio } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiButton, TuiIcon, TuiAlertService } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { FacadeService } from '../../services/facade.service';
import { ValidatorsService } from '../../services/validators.service';


@Component({
  selector: 'app-form',
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
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  /**
   * API a ser editada.
   */
  @Input() itemToEdit: any;

  /**
   * Itens a serem visualizados.
   */
  @Input() viewForm: any;

  /**
   * Formulário recebido.
   */
  @Output() formSubmit = new EventEmitter<any>();

  /**
   * Formulário que armazenará as API's.
   */
  form!: FormGroup;

  /**
   * Construtor da classe.
   * @param validatorsService Serviço de validações.
   */
  constructor(
    private readonly validatorsService: ValidatorsService
  ) { }

  /**
  * Chamada no ngOnInit para inicializar o componente.
  */
  ngOnInit(): void {
    this.initializeForm();
    this.verifyEdit();
  }

  /**
   * Função que verifica se deve editar ou criar um formulário.
   */
  verifyEdit(): void {
    if (this.itemToEdit) {
      console.log('edit', this.itemToEdit)
      this.form.patchValue(this.itemToEdit);
      this.populateHeaders(this.itemToEdit.cabecalho);
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

  populateHeaders(headers: any[]): void {
    this.cabecalho.clear();
    headers.forEach((header: any) => {
      const headerGroup = new FormGroup({
        propriedade: new FormControl(header.propriedade, Validators.required),
        valor: new FormControl(header.valor, Validators.required),
      });
      this.cabecalho.push(headerGroup);
    });
  }

  /**
   * Função para verifica qual fluxo seguir: editar ou criar uma API.
   */
  submit(): void {
    this.formSubmit.emit(this.form.value); // Emitir o formulário ao criar item
    this.form.reset();
  }
}
