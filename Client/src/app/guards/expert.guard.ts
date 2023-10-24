import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Injectable({
    providedIn: 'root'
  })
  export class ExpertAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.authService.isExpertAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['/login']); // Rediriger vers la page de connexion
        return false;
      }
    }
  }