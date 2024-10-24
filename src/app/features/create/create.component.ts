import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '../../shared/components/form/form.component';
import { FacadeService } from '../../shared/services/facade.service';
import { ModalService } from '../../shared/services/modal.service';
import { TuiButton } from '@taiga-ui/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../shared/services/form.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent, TuiButton],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  form!: FormGroup;

  /**
   * Construtor da classe.
   * @param facadeService Serviço de lista.
   * @param modalService Serviço de modal.
   * @param formService Serviço de formulário.
   */
  constructor(
    private readonly facadeService: FacadeService,
    private readonly modalService: ModalService,
    private readonly formService: FormService
  ) {}

  /**
   * Inicializa o componente.
   */
  ngOnInit(): void {
    this.form = this.formService.initializeForm();
  }

  /**
   * Submit do formulário.
   */
  submitForm(): void {
    const $adicionarAPI = this.facadeService.set(this.form.value);
    $adicionarAPI.subscribe(() => {
      this.modalService.showAlert('API adicionada com sucesso!');
      this.form.reset();
    });
  }
}
