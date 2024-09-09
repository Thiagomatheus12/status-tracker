import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MethodEnum } from '../../shared/enums/methodType.enum';
import { Router, RouterModule } from '@angular/router';
import { FacadeService } from '../../shared/services/facade.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  apis!: Array<any>

  constructor(
    private router: Router,
    private readonly facade: FacadeService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.facade.getList().subscribe((res) => {
      this.apis = res;
    });
  }

  edit(id: number): void {
    this.router.navigate([`edit/${id}`]);
  }

  exclude(id: number): void {
    this.facade.delete(id).subscribe(() => {

    })
  }

}
