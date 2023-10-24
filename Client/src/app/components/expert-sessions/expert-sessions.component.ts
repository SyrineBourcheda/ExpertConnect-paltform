import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expert } from 'src/app/models/expert';
import { Reservation } from 'src/app/models/reservation';
import { Session } from 'src/app/models/session';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ExpertService } from 'src/app/services/expert.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-expert-sessions',
  templateUrl: './expert-sessions.component.html',
  styleUrls: ['./expert-sessions.component.css']
})
export class ExpertSessionsComponent implements OnInit {
  reservations: Reservation[] = [];
  sessionReservationsCounts: any[] = [];
  sessions : Session[] = [];
  expert: Expert = {
    name: '',
    email: '',
    password:'',
    bio: '',
    companyName: '',
    facebookProfile: '',
    linkedinProfile: '',
    phoneNumber: '',
  };

  constructor(private reservationService:ReservationService,private authService: AuthService,private route: ActivatedRoute,private sessionService: SessionService,private expertService: ExpertService,private router: Router ) { }

 
  getSessions(email: string): void {
    this.sessionService.getSessionsByEmail(email)
      .subscribe(sessions => {
        this.sessions = sessions;
      
  
        for (const session of this.sessions) {
          this.reservationService.getReservationsBySession(session.id!)
            .subscribe(reservations => {
              const reservationsCount = reservations.length;
        
              this.sessionReservationsCounts.push({ session, reservationsCount });
              console.log(this.sessionReservationsCounts[0])
              if (this.sessionReservationsCounts.length === this.sessions.length) {
                // Toutes les sessions ont été traitées, le tableau est prêt
                console.log(this.sessionReservationsCounts);
              }
            });
        }
      });
  }
  
  ExpertLogout() {
    this.authService.logoutExpert();
  }

  dateShow(inputDate:string | number | Date){
    const dateObject = new Date(inputDate);
    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1;
    const year = dateObject.getUTCFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    return formattedDate;
   }
   deleteSession(id: number) {
    this.sessionService.deleteSession(id)
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
  getExpert(email:string){
    this.expertService.getExpertByEmail(email)
    .subscribe(expert=>
      this.expert=expert)
  }

  extractInitials(fullName: string): string {
    const words = fullName.split(' ');
      return words.map((word) => word.charAt(0)).join('');
   }
   goToUpdate(id: number): void {
    this.router.navigate(['sessionFormUpdate', id]); // Naviguer vers le chemin 'details/:id'
  }
  goToList(id: number): void {
    this.router.navigate(['candidateList', id]); // Naviguer vers le chemin 'details/:id'
  }

  ngOnInit(): void {
    console.log(this.authService.getExpertEmail()!)
    this.getExpert(this.authService.getExpertEmail()!)
   this.getSessions(this.authService.getExpertEmail()!)
   
  }
}