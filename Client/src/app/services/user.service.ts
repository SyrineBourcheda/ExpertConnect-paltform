import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpClient) { }
  private url = "User"
  getUserByEmail(email: string): Observable<User> {
    const url = `${environment.apiUrl}/${this.url}/GetUserByEmail/${email}`;
    return this.http.get<User>(url);
  }

  getUser(email:string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${this.url}/Email:test?Email=${email}`)
  }

  updateUser(user:User,email:string):Observable<User>{
    return this.http.put<User>(`${environment.apiUrl}/${this.url}/Email:test?Email=${email}`,user);
  }
 
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`)
    
  }
}
