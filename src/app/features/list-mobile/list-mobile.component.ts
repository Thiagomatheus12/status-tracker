import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FacadeService } from '../../shared/services/facade.service';
import { Router } from '@angular/router';
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { TuiChevron } from '@taiga-ui/kit';

@Component({
  selector: 'app-list-mobile',
  standalone: true,
  imports: [
    CommonModule,
    TuiDataList,
    TuiDropdown,
    TuiIcon,
    TuiButton,
    TuiChevron
  ],
  templateUrl: './list-mobile.component.html',
  styleUrl: './list-mobile.component.scss'
})
export class ListMobileComponent {

  /**
   * Data do componente.
   */
  @Input() data: any;

  /**
   * Evento para deletear item da lista.
   */
  @Output() itemDeleted = new EventEmitter<string>();


  /**
 * Contrutor da classe.
 * @param router Serviço de rotas
 * @param facadeService Serviço de lista.
 */
  constructor(
    private readonly facadeService: FacadeService,
    private readonly router: Router
  ) { }

  /**
   * Resgata os dados da lista.
   */
  getList(): void {
    this.facadeService.getList().subscribe((res) => this.data.next(res));
  }

  /**
 * Exclui um item da lista através do ID.
 * @param id ID do item da lista.
 */
  exclude(id: string): void {
    this.itemDeleted.emit(id);
  }

  /**
 * Navega para a página de edição.
 * @param id ID do item da lista.
 */
  edit(id: string): void {
    this.router.navigate([`edit/${id}`]);
  }
  /**
 * Navega para a página de visualização.
 * @param id ID do item da lista.
 */
  viewForm(id: string): void {
    this.router.navigate([`view/${id}`]);
  }
}
