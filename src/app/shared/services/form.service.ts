import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from './validators.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private readonly validatorsService: ValidatorsService) { }

  initializeForm(): FormGroup {
      return new FormGroup({
      alias: new FormControl('', Validators.required),
      webhook: new FormControl('', Validators.required),
      url: new FormControl('', [
        Validators.required,
        this.validatorsService.urlValidator(),
      ]),
      corpo: new FormControl(''),
      metodo: new FormControl('', Validators.required),
      cabecalho: new FormArray([]),
    });
  }

    /**
   * Adiciona um header ao formulário.
   */
    addHeader(cabecalho: FormArray): void {
      const headerGroup = new FormGroup({
        propriedade: new FormControl('',Validators.required),
        valor: new FormControl('', Validators.required),
      });
      cabecalho.push(headerGroup);
    }

    /**
     * Função para remover um header da lista.
     */
    deleteHeader(cabecalho: FormArray, index: number ): void {
      cabecalho.removeAt(index);
    }

}
