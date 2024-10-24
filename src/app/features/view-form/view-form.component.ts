import { Component } from '@angular/core';
import { FormComponent } from '../../shared/components/form/form.component';
import { FacadeService } from '../../shared/services/facade.service';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../shared/services/form.service';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-form',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './view-form.component.html',
  styleUrl: './view-form.component.scss'
})
export class ViewFormComponent {
  /**
   * Dados do formulário.
   */
  form!: FormGroup;

  /**
   * Construtor da classe.
   * @param facadeService Serviço de lista.
   * @param route Serviço de rotas.
   * @param formService Serviço de formulário.
   */
  constructor(
    private readonly facadeService: FacadeService,
    private readonly route: ActivatedRoute,
    private readonly formService: FormService
  ) { }

  /**
   * Inicializa o componente.
   */
  ngOnInit(): void {
    this.form = this.formService.initializeForm();
    this.getData();
  }

  /**
   * Função que resgata os dados e preenche o formulário.
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

      // Desabilitar o formulário para visualização
      this.form.disable();
    });
  }

  /**
   * Get que resgata o ID.
   */
  get id(): string {
    return this.route.snapshot.paramMap.get('id')!;
  }
}
