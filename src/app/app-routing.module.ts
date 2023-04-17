import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChallengesDashboardComponent } from './components/challenges-dashboard/challenges-dashboard.component';
import { UsersDashboardsComponent } from './components/users-dashboards/users-dashboards.component'

import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { CreateChallengeComponent } from './components/create-challenge/create-challenge.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: ChallengesDashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersDashboardsComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'challenge/:id', component: ChallengeComponent, canActivate: [AuthGuard] },
  { path: 'create-challenge', component: CreateChallengeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
