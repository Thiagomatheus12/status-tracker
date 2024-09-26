import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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

  constructor(private readonly formService: FormService) {}

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
