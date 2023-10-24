import { Injectable } from '@angular/core';
import { Session } from '../models/session';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private url = "Session";
  constructor(private http :HttpClient) { }

  public getSessions() : Observable<Session[]>{

    return this.http.get<Session[]>(`${environment.apiUrl}/${this.url}`)
    
  }
  public createSession(session: Session): Observable<Session[]> {
    return this.http.post<Session[]>(
      `${environment.apiUrl}/${this.url}`,
      session
    );
  }
  public getSessionById(id: number): Observable<Session> {
    return this.http.get<Session>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  getSessionsByEmail(email: string): Observable<Session[]> {
    const url = `${environment.apiUrl}/${this.url}/GetSessionsByEmail/${email}`;
    return this.http.get<Session[]>(url);
  }

  deleteSession(sessionId: number): Observable<void> {
    const url = `${environment.apiUrl}/${this.url}/${sessionId}`;

    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Une erreur s\'est produite : ', error);
    return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
  }

  updateSession(id: number, updatedSession: Session): Observable<void> {
    const url = `${environment.apiUrl}/${this.url}/update/${id}`;
    return this.http.put<void>(url, updatedSession);
  }
}
  

