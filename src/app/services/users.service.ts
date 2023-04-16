import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  
  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`/api/user/${id}`)
  }

  // todo - create/edit challenge
}
