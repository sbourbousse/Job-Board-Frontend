import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ApplyComponent } from './jobs/apply/apply.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditComponent } from './auth/edit/edit.component';
import { AdminComponent } from './admin/admin.component';
import { AdminSigninComponent } from './admin/auth/admin-signin/admin-signin.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';


import { AdminGuardService} from './services/admin-guard.service';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/jobs' },
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'jobs/:id/apply', component: ApplyComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'account/informations', component: EditComponent, canActivate: [AuthGuardService]},
  { path: 'admin/signin', component: SigninComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuardService]},
  { path: '**' , component: FourOhFourComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
