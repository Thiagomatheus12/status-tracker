import { Component } from '@angular/core';
import { FacadeService } from '../../shared/services/facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateComponent } from "../create/create.component";
import { CommonModule } from '@angular/common';
import { FormComponent } from "../../shared/components/form/form.component";
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CreateComponent, CommonModule, FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  data: any;

  constructor(
    private readonly facadeService: FacadeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.facadeService.get(this.id).subscribe((res) => {
      this.data = res;
    });
  }

  get id(): string {
    return this.route.snapshot.paramMap.get('id')!;
  }

  /**
 * Função para editar uma API da lista.
 * @param formData Dados do formulário emitidos pelo FormComponent.
 */
  updateItem(formData: any): void {
    const $atualizarAPI = this.facadeService.update(this.id, formData);
    $atualizarAPI.subscribe(() => {
      this.router.navigate(['/list']);
      this.modalService.showAlert('API atualizada com sucesso!');
    });
  }
}
