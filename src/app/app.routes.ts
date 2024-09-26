import { Routes } from '@angular/router';
import { CreateComponent } from './features/create/create.component';
import { ListComponent } from './features/list/list.component';
import { EditComponent } from './features/edit/edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'create', component: CreateComponent },
  { path: 'list', component: ListComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'view/:id', component: EditComponent },

];
