import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }


  getAllUsers(params?: HttpParams): Observable<any> {
    return this.http.get('/api/users', { params: params });
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`/api/user/${id}`)
  }

  updateUser(id: number, user: User): Observable<any> {

    return this.http.put(`api/user/${id}`, user, this.httpOptions);
  }

}
