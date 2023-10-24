import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/models/reservation';
import { Session } from 'src/app/models/session';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-sessions',
  templateUrl: './user-sessions.component.html',
  styleUrls: ['./user-sessions.component.css']
})
export class UserSessionsComponent implements OnInit {
  reservations: Reservation[] = [];
  sessionReservations: any=[]
  sessions : Session[] = [];
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

  constructor(private reservationService:ReservationService,private authService: AuthService,private route: ActivatedRoute,private sessionService: SessionService,private userService: UserService) { }

  getReservations(email: string): void {
    
    this.reservationService.getReservationByEmail(email)
    .subscribe(reservations => {
      this.reservations = reservations;
      this.processSessionIds()

      
    });
  }
  
  getSessions(email: string): void {
    this.sessionService.getSessionsByEmail(email)
      .subscribe(sessions => {
        this.sessions = sessions;
      
  
      });
  }
  UserLogout() {
    this.authService.logoutUser();
  }
  processSessionIds(): void {
    this.reservations.forEach(reservation => {
      const sessionId = reservation.sessionId;
       this.sessionService.getSessionById(sessionId!)
      .subscribe(session => {
      this.sessions.push(session)
    
      this.reservationService.getReservationStatus(this.authService.getUserEmail()!,session.id!)
      .subscribe((response:any)=>{
         
        this.sessionReservations.push({ session,status:response.status});
        console.log( this.sessionReservations)
      })
       
        
      });
    });
    console.log(this.sessions)
  }
  dateShow(inputDate:string | number | Date){
    const dateObject = new Date(inputDate);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1;
    const year = dateObject.getUTCFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    return formattedDate;
   }
   deleteReservation(id: number) {
    this.reservationService.deleteReservation(id,this.authService.getUserEmail()!)
    .subscribe(
      () => {
        console.log('Réservation libérée avec succès.');
        // Mettez à jour votre interface utilisateur ici si nécessaire.
      },
      error => {
        console.error('Erreur lors de la libération de la réservation : ', error);
        // Gérez l'erreur dans votre interface utilisateur si nécessaire.
      }
    
    );
    
    const indexToDelete = this.sessions.findIndex(session => session.id === id);

    if (indexToDelete !== -1) {
      // Suppression de la session à l'index trouvé
      this.sessions.splice(indexToDelete, 1);
    
    } else {
      console.log(`La session avec l'ID ${id} n'a pas été trouvée.`);
    }

    window.location.reload();
     
   
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
  ngOnInit(): void {
    this.getUser(this.authService.getUserEmail()!)
    console.log(this.getReservations(this.authService.getUserEmail()!))
   
  }

}
