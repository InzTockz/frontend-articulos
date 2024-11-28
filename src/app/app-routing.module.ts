import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFamiliaComponent } from './components/familias/list-familia/list-familia.component';
import { UpdateFamiliaComponent } from './components/familias/update-familia/update-familia.component';
import { ListSubfamiliaComponent } from './components/subfamilias/list-subfamilia/list-subfamilia.component';
import { UpdateSubfamiliaComponent } from './components/subfamilias/update-subfamilia/update-subfamilia.component';
import { ListArticuloComponent } from './components/articulos/list-articulo/list-articulo.component';
import { UpdateArticuloComponent } from './components/articulos/update-articulo/update-articulo.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { authGuard } from './guards/auth.guard';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { FamiliasReporteComponent } from './components/reportes/familias-reporte/familias-reporte.component';
import { SubfamiliasReporteComponent } from './components/reportes/subfamilias-reporte/subfamilias-reporte.component';
import { ArticulosReporteComponent } from './components/reportes/articulos-reporte/articulos-reporte.component';
import { ClientesSapComponent } from './components/clientes-sap/clientes-sap.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: '', component: HomeComponent, canActivate:[authGuard]},
  {path: 'user', component: UserListComponent, canActivate:[authGuard]},

  {path: 'familias', component: ListFamiliaComponent, canActivate: [authGuard]},
  {path: 'familias/update/:id', component: UpdateFamiliaComponent, canActivate:[authGuard]},

  {path: 'subfamilias', component: ListSubfamiliaComponent, canActivate:[authGuard]},
  {path: 'subfamilias/update/:id', component: UpdateSubfamiliaComponent, canActivate:[authGuard]},

  {path: 'articulos', component: ListArticuloComponent, canActivate:[authGuard]},
  {path: 'articulos/update/:id', component: UpdateArticuloComponent, canActivate:[authGuard]},

  {path: 'reportes/familias', component: FamiliasReporteComponent, canActivate:[authGuard]},
  {path: 'reportes/subfamilias', component: SubfamiliasReporteComponent, canActivate:[authGuard]},
  {path: 'reportes/articulos', component: ArticulosReporteComponent, canActivate:[authGuard]},

  {path: 'clientes-sap', component: ClientesSapComponent, canActivate:[authGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
