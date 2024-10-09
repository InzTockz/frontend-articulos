import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFamiliaComponent } from './components/familias/list-familia/list-familia.component';
import { AddFamiliaComponent } from './components/familias/add-familia/add-familia.component';
import { UpdateFamiliaComponent } from './components/familias/update-familia/update-familia.component';
import { ListSubfamiliaComponent } from './components/subfamilias/list-subfamilia/list-subfamilia.component';
import { AddSubfamiliaComponent } from './components/subfamilias/add-subfamilia/add-subfamilia.component';
import { UpdateSubfamiliaComponent } from './components/subfamilias/update-subfamilia/update-subfamilia.component';
import { ListArticuloComponent } from './components/articulos/list-articulo/list-articulo.component';
import { AddArticuloComponent } from './components/articulos/add-articulo/add-articulo.component';
import { UpdateArticuloComponent } from './components/articulos/update-articulo/update-articulo.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: '', component: HomeComponent, canActivate:[authGuard]},

  {path: 'familias', component: ListFamiliaComponent, canActivate: [authGuard]},
  {path: 'familias/register', component: AddFamiliaComponent, canActivate:[authGuard]},
  {path: 'familias/update/:id', component: UpdateFamiliaComponent, canActivate:[authGuard]},

  {path: 'subfamilias', component: ListSubfamiliaComponent, canActivate:[authGuard]},
  {path: 'subfamilias/register', component: AddSubfamiliaComponent, canActivate:[authGuard]},
  {path: 'subfamilias/update/:id', component: UpdateSubfamiliaComponent, canActivate:[authGuard]},

  {path: 'articulos', component: ListArticuloComponent, canActivate:[authGuard]},
  {path: 'articulos/register', component: AddArticuloComponent, canActivate:[authGuard]},
  {path: 'articulos/update/:id', component: UpdateArticuloComponent, canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
