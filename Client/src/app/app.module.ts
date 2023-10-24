import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionFormComponent } from './components/session-form/session-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ExpertPageComponent } from './components/expert-page/expert-page.component';
import { UserMainPageComponent } from './components/user-main-page/user-main-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { SessionDetailsComponent } from './components/session-details/session-details.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSessionsComponent } from './components/user-sessions/user-sessions.component';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { ExpertSessionsComponent } from './components/expert-sessions/expert-sessions.component';
import { SessionFormUpdateComponent } from './components/session-form-update/session-form-update.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgClass } from '@angular/common';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { ExpertProfilComponent } from './components/expert-profil/expert-profil.component';
import { HomePageComponent } from './components/home-page/home-page.component';



@NgModule({
  declarations: [
    AppComponent,
    SessionFormComponent,
    ExpertPageComponent,
    UserMainPageComponent,
    LoginComponent,
    SignupComponent,
    UserLoginComponent,
    UserSignupComponent,
    SessionDetailsComponent,
    UserSessionsComponent,
    ExpertSessionsComponent,
    SessionFormUpdateComponent,
    CandidateListComponent,
    NavbarComponent,
    UserProfilComponent,
    HomePageComponent,
    ExpertProfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    NgClass,
    NgbDropdownModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('userToken');
        },
        allowedDomains: ['localhost:7115'], // Remplacez par votre domaine
        disallowedRoutes: ['https://localhost:7115/api/ExpertUser/authenticate'] // Empêche l'envoi du token à cet endpoint
      }
    }),
    // ..
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
