import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListFamiliaComponent } from './components/familias/list-familia/list-familia.component';
import { UpdateFamiliaComponent } from './components/familias/update-familia/update-familia.component';
import { UpdateSubfamiliaComponent } from './components/subfamilias/update-subfamilia/update-subfamilia.component';
import { ListSubfamiliaComponent } from './components/subfamilias/list-subfamilia/list-subfamilia.component';
import { ListArticuloComponent } from './components/articulos/list-articulo/list-articulo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { FamiliasReporteComponent } from './components/reportes/familias-reporte/familias-reporte.component';
import { SubfamiliasReporteComponent } from './components/reportes/subfamilias-reporte/subfamilias-reporte.component';
import { ArticulosReporteComponent } from './components/reportes/articulos-reporte/articulos-reporte.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomDateAdapter } from './utils/custom-date-adapter';
import { DatePipe } from '@angular/common';
import { DialogAddArticuloComponent } from './components/articulos/dialog-add-articulo/dialog-add-articulo.component';
import { DialogAddFamiliaComponent } from './components/familias/dialog-add-familia/dialog-add-familia.component';
import { DialogUpdateFamiliaComponent } from './components/familias/dialog-update-familia/dialog-update-familia.component';
import { DialogAddSubfamiliaComponent } from './components/subfamilias/dialog-add-subfamilia/dialog-add-subfamilia.component';
import { DialogUpdateSubfamiliaComponent } from './components/subfamilias/dialog-update-subfamilia/dialog-update-subfamilia.component';
import { DialogUpdateArticulosComponent } from './components/articulos/dialog-update-articulos/dialog-update-articulos.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListClienteComponent } from './components/clientes-sap/list-cliente/list-cliente.component';
import { DialogAddCredencialesComponent } from './components/clientes-sap/dialog-add-credenciales/dialog-add-credenciales.component';
import { DialogEnviarCredencialesComponent } from './components/clientes-sap/dialog-enviar-credenciales/dialog-enviar-credenciales.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogAddUserComponent } from './components/user/dialog-add-user/dialog-add-user.component';
import { DialogUpdateUserComponent } from './components/user/dialog-update-user/dialog-update-user.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogInfoArticulosComponent } from './components/articulos/dialog-info-articulos/dialog-info-articulos.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DialogCargarCredencialesComponent } from './components/clientes-sap/dialog-cargar-credenciales/dialog-cargar-credenciales.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ListFamiliaComponent,
    UpdateFamiliaComponent,
    UpdateSubfamiliaComponent,
    ListSubfamiliaComponent,
    ListArticuloComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserListComponent,
    FamiliasReporteComponent,
    SubfamiliasReporteComponent,
    ArticulosReporteComponent,
    DialogAddArticuloComponent,
    DialogAddFamiliaComponent,
    DialogUpdateFamiliaComponent,
    DialogAddSubfamiliaComponent,
    DialogUpdateSubfamiliaComponent,
    DialogUpdateArticulosComponent,
    ListClienteComponent,
    DialogAddCredencialesComponent,
    DialogEnviarCredencialesComponent,
    DialogAddUserComponent,
    DialogUpdateUserComponent,
    DialogInfoArticulosComponent,
    DialogCargarCredencialesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatMenuModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTooltipModule,
    SlickCarouselModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
