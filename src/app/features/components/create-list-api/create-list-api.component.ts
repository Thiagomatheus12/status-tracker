import { Component } from '@angular/core';
import { CreateListApiService } from '../../../shared/services/create-list-api.service';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-list-api',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-list-api.component.html',
  styleUrl: './create-list-api.component.scss'
})
export class CreateListApiComponent {

  form!: FormGroup;

  constructor(
    private readonly createListApiService: CreateListApiService
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
