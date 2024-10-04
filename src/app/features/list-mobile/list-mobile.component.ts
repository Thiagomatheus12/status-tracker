import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FacadeService } from '../../shared/services/facade.service';
import { ModalService } from '../../shared/services/modal.service';
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
  @Input() data: any;

  @Output() itemDeleted = new EventEmitter<string>();

  constructor(
    private readonly facadeService: FacadeService,
    private readonly modalService: ModalService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.data)

  }

  getList(): void {
    this.facadeService.getList().subscribe((res) => this.data.next(res));
  }

  exclude(id: string): void {
    this.itemDeleted.emit(id);
  }

  edit(id: string): void {
    this.router.navigate([`edit/${id}`]);
  }

  viewForm(id: string): void {
    this.router.navigate([`view/${id}`]);
  }
}
