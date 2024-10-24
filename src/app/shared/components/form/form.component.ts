import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiLabel } from '@taiga-ui/core';
import { TuiRadio } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { FormService } from '../../services/form.service';

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
    TuiIcon,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {

  /**
   * Dados do formulário.
   */
  @Input() form!: FormGroup;

  /**
   * Verifica se está no modo de visualização.
   */
  @Input() modeView!: boolean;

  /**
   * Emite as mudanças do formulário de volta para o componente pai
   */
  @Output() formChange = new EventEmitter<FormGroup>();

  /**
   * Construtor da classe.
   * @param formService Serviço de lista.
   */
  constructor(private readonly formService: FormService) { }

  // Função para emitir as mudanças
  onFormChange(): void {
    this.formChange.emit(this.form);
  }

  /**
   * Adiciona cabeçalhos no formulário.
   */
  addHeader(): void {
    this.formService.addHeader(this.cabecalho);
  }

  /**
   * Verifica se é necessário o body.
   * @returns Retorna true se for diferente de GET.
   */
  hasBody(): boolean {
    return this.form.get('metodo')?.value !== 'GET'
  }

  /**
   * Remove cabeçalho através do index.
   * @param index Index do cabeçalho.
   */
  deleteHeader(index: number): void {
    this.formService.deleteHeader(this.cabecalho, index);
  }

  /**
   * Get que resgata o cabeçalho.
   */
  get cabecalho(): FormArray {
    return this.form.get('cabecalho') as FormArray;
  }
}
