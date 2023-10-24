import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Feedback } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = "Feedback";
  constructor(private http: HttpClient) { }
  
  public getComments() : Observable<Feedback[]>{

    return this.http.get<Feedback[]>(`${environment.apiUrl}/${this.url}`)
    
  }

  public createComment(comment: Feedback): Observable<Feedback[]> {
    return this.http.post<Feedback[]>(
      `${environment.apiUrl}/${this.url}`,
      comment
    );
  }


  getFeedbacks(idSession: number): Observable<Feedback[]> {
    const url = `${environment.apiUrl}/${this.url}/GetCommentBySession/${idSession}`;
    return this.http.get<Feedback[]>(url);
  }

}
