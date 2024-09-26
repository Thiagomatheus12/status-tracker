import { ChangeDetectionStrategy, Component} from '@angular/core';
import { FormComponent } from '../../shared/components/form/form.component';
import { FacadeService } from '../../shared/services/facade.service';
import { ModalService } from '../../shared/services/modal.service';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {

  constructor(
    private readonly facadeService: FacadeService,
    private readonly modalService: ModalService
  ) {}
  /**
   * Função para adicionar uma nova API a lista.
   * @param formData Dados do formulário emitidos pelo FormComponent.
   */
  createItem(formData: any): void {
    const $adicionarAPI = this.facadeService.set(formData);
    $adicionarAPI.subscribe(() => {
      this.modalService.showAlert('API adicionada com sucesso!');
    });
  }
}
