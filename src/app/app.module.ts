import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { JobsComponent } from './jobs/jobs.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobCardComponent } from './jobs/job-list/job-card/job-card.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from './auth/signin/signin.component';
import { ApplyComponent } from './jobs/apply/apply.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditComponent } from './auth/edit/edit.component';
import { AdminComponent } from './admin/admin.component';
import { AdminSigninComponent } from './admin/auth/admin-signin/admin-signin.component';
import { TableComponent } from './admin/table/table.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';



@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    JobListComponent,
    JobDetailComponent,
    JobCardComponent,
    SigninComponent,
    ApplyComponent,
    SignupComponent,
    EditComponent,
    AdminComponent,
    AdminSigninComponent,
    TableComponent,
    FourOhFourComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
