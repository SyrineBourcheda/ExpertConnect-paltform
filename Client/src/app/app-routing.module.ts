import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionFormComponent } from './components/session-form/session-form.component';
import { ExpertPageComponent } from './components/expert-page/expert-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { UserMainPageComponent } from './components/user-main-page/user-main-page.component';
import { SessionDetailsComponent } from './components/session-details/session-details.component';
import { UserSessionsComponent } from './components/user-sessions/user-sessions.component';
import { ExpertAuthGuard } from './guards/expert.guard';
import { UserAuthGuard } from './guards/user.guard';
import { ExpertSessionsComponent } from './components/expert-sessions/expert-sessions.component';
import { SessionFormUpdateComponent } from './components/session-form-update/session-form-update.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { ExpertProfilComponent } from './components/expert-profil/expert-profil.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {path :'', component:HomePageComponent},
  {
    path: 'sessionForm',
    component: SessionFormComponent,
    canActivate: [ExpertAuthGuard] // Utiliser le guard UserAuthGuard pour protéger cette route
  },
  
  {
    path: 'sessionFormUpdate/:id',
    component: SessionFormUpdateComponent,
    canActivate: [ExpertAuthGuard] // Utiliser le guard UserAuthGuard pour protéger cette route
  },
  {
    path: 'expertPage',
    component: ExpertPageComponent,
    canActivate: [ExpertAuthGuard] // Utiliser le guard UserAuthGuard pour protéger cette route
  },
 
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'userlogin', component:UserLoginComponent},
    {path:'usersignup', component:UserSignupComponent},
    
    {
      path: 'userProfile',
      component: UserProfilComponent,
      canActivate: [UserAuthGuard] // Utiliser le guard UserAuthGuard pour protéger cette route
    },

    {
      path: 'sessionDetail/:id',
      component: SessionDetailsComponent,
      canActivate: [UserAuthGuard] // Utiliser le guard UserAuthGuard pour protéger cette route
    },
    {
      path: 'userSessions',
      component: UserSessionsComponent,
      canActivate: [UserAuthGuard] // Utiliser le guard UserAuthGuard pour protéger cette route
    },
    {
      path: 'userPage',
      component: UserMainPageComponent,
      canActivate: [UserAuthGuard] // Utiliser le guard UserAuthGuard pour protéger cette route
    },
    
    {
      path: 'expertProfile',
      component: ExpertProfilComponent,
      canActivate: [ExpertAuthGuard] // Utiliser le guard UserAuthGuard pour protéger cette route
    },
    {
      path: 'expertSessions',
      component: ExpertSessionsComponent,
      canActivate: [ExpertAuthGuard] // Utiliser le guard UserAuthGuard pour protéger cette route
    },
    {
      path: 'candidateList/:id',
      component: CandidateListComponent,
      canActivate: [ExpertAuthGuard] // Utiliser le guard UserAuthGuard pour protéger cette route
    },
    
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}