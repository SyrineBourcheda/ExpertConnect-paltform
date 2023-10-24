import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { Expert } from 'src/app/models/expert';
import { Reservation } from 'src/app/models/reservation';
import { AuthService } from 'src/app/services/auth.service';
import { ExpertService } from 'src/app/services/expert.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css','./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  reservations: Reservation[] = [];
 users: any[] = [];
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


 idSession =0

  constructor(private reservationService:ReservationService,private authService: AuthService,private route: ActivatedRoute,private sessionService: SessionService,private userService: UserService,private expertService : ExpertService ) { }
  ExpertLogout() {
    this.authService.logoutExpert();
  }

  getExpert(email:string){
    this.expertService.getExpertByEmail(email)
    .subscribe(expert=>
      this.expert=expert)
  }
  getReservations(id: number): void {
    this.reservationService.getReservationsBySession(id).subscribe((reservations) => {
      this.reservations = reservations;

    const getUserObservables: Observable<any>[] = [];

    for (const reservation of this.reservations) {
      console.log(reservation.userEmail);
      const getUserObservable: Observable<any> = this.userService.getUserByEmail(reservation.userEmail).pipe(
        mergeMap(user => {
          return this.reservationService.getReservationStatus(user.email, id).pipe(
            map((response:any) => ({
              ...user,
              status: response.status
            }))
          );
        })
       
      );
      getUserObservables.push(getUserObservable);
    }

    forkJoin(getUserObservables).subscribe((usersWithStatus) => {
      this.users = usersWithStatus;
      console.log(this.users)
    });
    });
  }
  onAcceptReservation(sessionId: number, userEmail: string): void {
    this.reservationService.acceptReservation(sessionId, userEmail).subscribe(
      () => {
        console.log('Réservation acceptée avec succès.');
        // Réalisez d'autres actions si nécessaire après avoir accepté la réservation.
      },
      (error) => {
        console.error('Erreur lors de l\'acceptation de la réservation :', error);
      }
    );
    window.location.reload();
  }
  extractInitials(fullName: string): string {
    const words = fullName.split(' ');
      return words.map((word) => word.charAt(0)).join('');
   }
  onRefuseReservation(sessionId: number, userEmail: string): void {
    this.reservationService.refuseReservation(sessionId, userEmail).subscribe(
      () => {
        console.log('Réservation refusée avec succès.');
        // Réalisez d'autres actions si nécessaire après avoir accepté la réservation.
      },
      (error) => {
        console.error('Erreur lors du refus de la réservation :', error);
      }
    );
    window.location.reload();
  }
  

  getStatus(email:string,id:number) {
    this.reservationService.getReservationStatus(email,id).subscribe((response: any) => {
      const status = response.status;
     return status
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idSession = Number(params.get('id'));
      this.getReservations(this.idSession);
      this.getExpert(this.authService.getExpertEmail()!)
 
      
      
    });

  }

}
