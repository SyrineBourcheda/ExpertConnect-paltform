import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private url = "Reservation";
  constructor(private http :HttpClient) { }

  public getReservations() : Observable<Reservation[]>{

    return this.http.get<Reservation[]>(`${environment.apiUrl}/${this.url}`)
    
  }
  public createReservation(reservation: Reservation): Observable<Reservation[]> {
    return this.http.post<Reservation[]>(
      `${environment.apiUrl}/${this.url}`,
      reservation
    );
  }
  getReservationByEmail(email: string): Observable<Reservation[]> {
    const url = `${environment.apiUrl}/${this.url}/GetReservationsByEmail/${email}`;
    return this.http.get<Reservation[]>(url);
  }

  getReservationsBySession(sessionId: number): Observable<Reservation[]> {
    const url = `${environment.apiUrl}/${this.url}/GetReservationsBySession?idSession=${sessionId}`;
    return this.http.get<Reservation[]>(url);
  }
  
  getReservationStatus(userEmail: string,sessionId:number): Observable<Boolean> {
    const url = `${environment.apiUrl}/${this.url}/GetReservationStatus?userEmail=${userEmail}&id=${sessionId}`;
    return this.http.get<Boolean>(url);
  }

  getReservationsByUserAndSession(userEmail:String,sessionId:number) :Observable<Reservation>{
    const url = `${environment.apiUrl}/${this.url}/GetReservationByUserAndSession?userEmail=${userEmail}&sessionId=${sessionId}`;

    return this.http.get<Reservation>(url);
  }

 deleteReservation(sessionId: number, userEmail: string): Observable<void> {
    const url = `${environment.apiUrl}/${this.url}/${sessionId}/${userEmail}`;

    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Une erreur s\'est produite : ', error);
    return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
  }


  acceptReservation(sessionId: number, userEmail: string): Observable<any> {
    const url = `${environment.apiUrl}/${this.url}/${sessionId}/${userEmail}/accept`;
    return this.http.put(url, null);
  }
  refuseReservation(sessionId: number, userEmail: string): Observable<any> {
    const url = `${environment.apiUrl}/${this.url}/${sessionId}/${userEmail}/refuse`;
    return this.http.put(url, null);
  }
  
}
