import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  form!: FormGroup;

  constructor(
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      body: new FormControl(''),
      method: new FormControl('', Validators.required),
      headers: new FormArray([])
    });
  }

  get headers(): FormArray {
    return this.form.get('headers') as FormArray;
  }

  addHeader(): void {
    const headerGroup = new FormGroup({
      property: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
    this.headers.push(headerGroup);
  }



  deleteHeader(index: number):void {
    this.headers.removeAt(index);
  }

  submit(): void {
    if (this.form.valid) {
      const request = this.form.value;
      console.log(request);
    }
  }
}
