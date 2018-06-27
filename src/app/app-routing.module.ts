import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SkillComponent } from './skill/skill.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'myprofile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'users/:id/dashboard', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'users/:id/skills', component: SkillComponent, canActivate: [AuthGuard] },
  { path: 'users/:id/education', component: EducationComponent, canActivate: [AuthGuard] },
  { path: 'users/:id/experience', component: ExperienceComponent, canActivate: [AuthGuard] },
  { path: 'users/:id/projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
