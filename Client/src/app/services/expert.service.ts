import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expert } from '../models/expert';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  private url = "ExpertUser";

  constructor(private http: HttpClient) { }

  getExpertByEmail(email: string): Observable<Expert> {
    const url = `${environment.apiUrl}/${this.url}/GetExpertByEmail/${email}`;
    return this.http.get<Expert>(url);
  }

  getexpertUser(email:string): Observable<Expert> {
    return this.http.get<Expert>(`${environment.apiUrl}/${this.url}Email:test1?Email=${email}`)
  }



  updateexpertUser(user:Expert,email:string):Observable<Expert>{
    return this.http.put<Expert>(`${environment.apiUrl}/${this.url}/Email:test1?Email=${email}`,user);
  }


  getAllexpertUser(): Observable<Expert[]> {
    return this.http.get<Expert[]>(`${environment.apiUrl}/${this.url}`)
    
  }
}
