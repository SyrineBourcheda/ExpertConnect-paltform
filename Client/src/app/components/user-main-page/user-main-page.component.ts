import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/session';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-main-page',
  templateUrl: './user-main-page.component.html',
  styleUrls: ['./user-main-page.component.css']
})
export class UserMainPageComponent implements OnInit {
  sessions: Session[] = [];
  user: User = {
    name: '',
    email: '',
    password:'',
    bio: '',
    skills: '',
    facebookProfile: '',
    linkedinProfile: '',
    phoneNumber: '',
  };

  
  itemsPerPage = 4; // Nombre d'éléments par page
  currentPage = 1; // Page actuelle

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.sessions.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' }); 

      
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  }

  get totalPages() {
    return Math.ceil(this.sessions.length / this.itemsPerPage);
    
  }

  constructor(private sessionService: SessionService,private router: Router,private authService: AuthService,private userService:UserService) {
   
   }
   UserLogout() {
    this.authService.logoutUser();
  }
  getUser(email:string){
    this.userService.getUserByEmail(email)
    .subscribe(user=>
      this.user=user)
  }
  extractInitials(fullName: string): string {
   const words = fullName.split(' ');
     return words.map((word) => word.charAt(0)).join('');
  }
   dateShow(inputDate:string | number | Date){
    const dateObject = new Date(inputDate);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1;
    const year = dateObject.getUTCFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    return formattedDate;
   }
   goToDetails(id: number): void {
    this.router.navigate(['sessionDetail', id]); // Naviguer vers le chemin 'details/:id'
  }
  ngOnInit(): void {
    this.getUser(this.authService.getUserEmail()!)
    console.log(this.user)
    this.sessionService.getSessions().
    subscribe(
      (result: Session[]) => {
        this.sessions = result; // Store the retrieved sessions in the sessions array
        console.log(this.sessions); // Log the sessions array to the console
      }
    );
    
  }

}
