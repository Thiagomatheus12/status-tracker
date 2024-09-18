import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FacadeService } from '../../shared/services/facade.service';
import {TuiLabel} from '@taiga-ui/core';
import {TuiRadio, TuiStatus} from '@taiga-ui/kit';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import {TuiTextfield} from '@taiga-ui/core';
import {TuiButton} from '@taiga-ui/core';
import {TuiIcon, tuiIconResolverProvider, TuiIconPipe} from '@taiga-ui/core';

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
    TuiIcon,
  ],
  providers: [
    tuiIconResolverProvider((icon) =>
        icon.includes('/') ? icon : `/assets/icons/${icon}.svg`,
    ),
],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  form!: FormGroup;

  constructor(
    private readonly facadeService: FacadeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = new FormGroup({
      alias: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      corpo: new FormControl(''),
      metodo: new FormControl('', Validators.required),
      cabecalho: new FormArray([])
    });
  }

  get cabecalho(): FormArray {
    return this.form.get('cabecalho') as FormArray;
  }

  addHeader(): void {
    const headerGroup = new FormGroup({
      propriedade: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
    });
    this.cabecalho.push(headerGroup);
  }

  deleteHeader(index: number):void {
    this.cabecalho.removeAt(index);
  }

  submit(): void {
    const $adicionarAPI = this.facadeService.set(this.form.value);
    console.log(this.form.value)
    $adicionarAPI.subscribe(() => {
      alert('API adicionada com sucesso!');
    })
  }
}
