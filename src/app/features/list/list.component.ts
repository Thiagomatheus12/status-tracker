import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MethodEnum } from '../../shared/enums/methodType.enum';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  apis = [
    { url: 'apixyw.com.br/api/v3', alias: 'API teste GET', metodo: MethodEnum.GET, id: 1 },
    { url: 'apixyw.com.br/api/v3', alias: 'API teste DELETE', metodo: MethodEnum.DELETE, id: 2 },
    { url: 'apixyw.com.br/api/v3', alias: 'API teste POST', metodo: MethodEnum.POST, id: 3 },
    { url: 'apixyw.com.br/api/v3', alias: 'API teste PUT', metodo: MethodEnum.PUT, id: 4 },
  ]

  constructor(
    private router: Router
  ) { }

  edit(id: number): void {
    this.router.navigate([`edit/${id}`]);
  }

  exclude(id: number): void {

  }

}
