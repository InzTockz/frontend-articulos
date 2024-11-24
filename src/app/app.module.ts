import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddFamiliaComponent } from './components/familias/add-familia/add-familia.component';
import { ListFamiliaComponent } from './components/familias/list-familia/list-familia.component';
import { UpdateFamiliaComponent } from './components/familias/update-familia/update-familia.component';
import { UpdateSubfamiliaComponent } from './components/subfamilias/update-subfamilia/update-subfamilia.component';
import { ListSubfamiliaComponent } from './components/subfamilias/list-subfamilia/list-subfamilia.component';
import { AddSubfamiliaComponent } from './components/subfamilias/add-subfamilia/add-subfamilia.component';
import { AddArticuloComponent } from './components/articulos/add-articulo/add-articulo.component';
import { ListArticuloComponent } from './components/articulos/list-articulo/list-articulo.component';
import { UpdateArticuloComponent } from './components/articulos/update-articulo/update-articulo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule, NativeDateAdapter } from '@angular/material/core';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { FamiliasReporteComponent } from './components/reportes/familias-reporte/familias-reporte.component';
import { SubfamiliasReporteComponent } from './components/reportes/subfamilias-reporte/subfamilias-reporte.component';
import { ArticulosReporteComponent } from './components/reportes/articulos-reporte/articulos-reporte.component';
import { ClientesSapComponent } from './components/clientes-sap/clientes-sap.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CustomDateAdapter } from './utils/custom-date-adapter';
import { DatePipe } from '@angular/common';
import { DialogAddArticuloComponent } from './components/articulos/dialog-add-articulo/dialog-add-articulo.component';

/* Define el formato de la fecha con ceros iniciales
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};*/

@NgModule({
  declarations: [
    AppComponent,
    AddFamiliaComponent,
    ListFamiliaComponent,
    UpdateFamiliaComponent,
    UpdateSubfamiliaComponent,
    ListSubfamiliaComponent,
    AddSubfamiliaComponent,
    AddArticuloComponent,
    ListArticuloComponent,
    UpdateArticuloComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserListComponent,
    FamiliasReporteComponent,
    SubfamiliasReporteComponent,
    ArticulosReporteComponent,
    ClientesSapComponent,
    DialogAddArticuloComponent
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
    MatNativeDateModule
  ],
  providers: [
    //{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    { provide: DateAdapter, useClass: CustomDateAdapter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
