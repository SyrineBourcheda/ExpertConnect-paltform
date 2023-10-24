import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrlexpert: string =  "https://localhost:7115/api/ExpertUser/"
  private baseUrl: string =  "https://localhost:7115/api/User/"

  constructor(private http: HttpClient ,private router: Router) { }

  signUpexpert(userObj: any) {
    return this.http.post<any>(`${this.baseUrlexpert}register`,userObj);
  }


  
  private jwtHelper: JwtHelperService = new JwtHelperService();



  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticateuser`, loginObj)
      .pipe(
        tap(response => {
          const token = response.token;
          console.log('Token:', token);
          if (response && response.token ) {
            localStorage.setItem('userToken', response.token);
            localStorage.setItem('userEmail', response.userEmail);
          }
        })
      );
     
  }



  

  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    return token !== null ;
  }
  getExpertEmail(): string | null {
    
    return localStorage.getItem('expertEmail');
  }

  getUserEmail(): string | null {
    
    return localStorage.getItem('userEmail');
  }

  loginExpert(loginObj: any) {
    return this.http.post<any>(`${this.baseUrlexpert}authenticateexpert`, loginObj)
      .pipe(
        tap(response => {
          const token = response.token;
          console.log('Expert Token:', token);
          if (response && response.token) {
            localStorage.setItem('expertToken', response.token);
            localStorage.setItem('expertEmail', response.expertEmail);
          }
        })
      );
  }
  
  isExpertAuthenticated(): boolean {
    const token = localStorage.getItem('expertToken');
    console.log(token)
    return token !== null ;
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}registeruser`,userObj);
  }


  logoutExpert() {
    localStorage.removeItem('expertToken');
    localStorage.removeItem('expertEmail'); // Si vous stockez également l'adresse e-mail de l'expert
    // Vous pouvez également effectuer d'autres opérations de déconnexion spécifiques à l'expert ici
    this.router.navigate(['/login']); // Rediriger vers la page de connexion de l'expert
  }

  logoutUser() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail'); // Si vous stockez également l'adresse e-mail de l'expert
    // Vous pouvez également effectuer d'autres opérations de déconnexion spécifiques à l'expert ici
    this.router.navigate(['/userlogin']); // Rediriger vers la page de connexion de l'expert
  }




}

