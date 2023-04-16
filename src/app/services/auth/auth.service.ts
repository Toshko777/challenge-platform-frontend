import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';
import { RegisterUser } from 'src/app/models/registerUser';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private signInUrl = '/api/auth/signin';
  private signUpUrl = '/api/auth/signup';

  constructor(private http: HttpClient) { }

  signin(credentials: { usernameOrEmail: string, password: string }): Observable<any> {

    return this.http.post(this.signInUrl, credentials, this.httpOptions);
    // todo - handle exception maybe? 
    // .pipe(
    // );
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  signout() {
    // Remove the JWT from local storage
    localStorage.removeItem('jwt');
    // Redirect the user to the login page
    window.location.href = '/login';
  }

  signup(register: RegisterUser): Observable<any> {
    return this.http.post(this.signUpUrl, register);
  }

}