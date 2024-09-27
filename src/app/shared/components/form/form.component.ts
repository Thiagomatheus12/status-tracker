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

  @Input() form!: FormGroup; // Recebe o form do parent

  @Input() modeView!: boolean;

  // Emite as mudanças do formulário de volta para o componente pai
  @Output() formChange = new EventEmitter<FormGroup>();

  constructor(private readonly formService: FormService) { }

  // Função para emitir as mudanças
  onFormChange(): void {
    this.formChange.emit(this.form);
  }

  addHeader(): void {
    this.formService.addHeader(this.cabecalho);
  }

  deleteHeader(index: number): void {
    this.formService.deleteHeader(this.cabecalho, index);
  }

  get cabecalho(): FormArray {
    return this.form.get('cabecalho') as FormArray;
  }
}
