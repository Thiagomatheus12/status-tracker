import { Component } from '@angular/core';
import { FacadeService } from '../../shared/services/facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateComponent } from "../create/create.component";
import { CommonModule } from '@angular/common';
import { FormComponent } from "../../shared/components/form/form.component";
import { ModalService } from '../../shared/services/modal.service';
import { FormArray, FormGroup } from '@angular/forms';
import { FormService } from '../../shared/services/form.service';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CreateComponent, CommonModule, FormComponent, TuiButton],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  form!: FormGroup;

  constructor(
    private readonly facadeService: FacadeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly modalService: ModalService,
    private readonly formService: FormService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.form = this.formService.initializeForm();
  }

  /**
   * função que resgata os dados recebidos e preenche o formulário.
   */
  getData(): void {

    this.facadeService.get(this.id).subscribe((res) => {
      this.form.patchValue({
        alias: res.alias,
        webhook: res.webhook,
        url: res.url,
        corpo: res.corpo,
        metodo: res.metodo,
      });
      if (res.cabecalho && res.cabecalho.length > 0) {
        const cabecalhoArray = this.form.get('cabecalho') as FormArray;
        cabecalhoArray.clear();
        res.cabecalho.forEach((header: any) => {
          this.formService.addHeader(cabecalhoArray);
          const index = cabecalhoArray.length - 1;
          cabecalhoArray.at(index).patchValue({
            propriedade: header.propriedade,
            valor: header.valor
          });
        });
      }
    });
  }

    /**
   * Atualiza o formulário quando o componente filho emite a mudança.
   */
    onFormChange(updatedForm: FormGroup): void {
      this.form = updatedForm;
    }


/**
 * Get que resgata o ID.
 */
  get id(): string {
    return this.route.snapshot.paramMap.get('id')!;
  }

  /**
   * Submit do formulário.
   */
  submitForm(): void {
    const $atualizarAPI = this.facadeService.update(this.id, this.form.value);
    $atualizarAPI.subscribe(() => {
      this.router.navigate(['/list']);
      this.modalService.showAlert('API atualizada com sucesso!');
    });
  }
}
