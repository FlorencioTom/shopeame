import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProdsComponent } from './prods/prods.component';
import { GestionComponent } from './gestion/gestion.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'productos', component: ProdsComponent},
  {path: 'productos/:id', component: GestionComponent},
  {path: 'gestion', component: GestionComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
