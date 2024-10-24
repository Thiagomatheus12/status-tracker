import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  /**
   * Verifica se a URL é valida.
   * @returns Retorna se é uma URL válida.
   */
  urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*)?$/;

      if (control.value && !urlRegex.test(control.value)) {
        return { invalidUrl: true };
      }

      return null;
    };

  }
}
