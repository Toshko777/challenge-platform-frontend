import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = '/api';
  // private authUrl = this.apiUrl + '/admin/role';

  private signInUrl = '/api/auth/signin';

  constructor(private http: HttpClient) { }

  signin(credentials: {usernameOrEmail: string, password: string}): Observable<any> {
    return this.http.post(this.signInUrl, credentials);
  }

}