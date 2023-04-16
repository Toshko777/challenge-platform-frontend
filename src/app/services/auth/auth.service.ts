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

    return this.http.post(this.signInUrl, credentials, this.httpOptions).pipe(
      tap(response => {
        this.saveInfosToLocalStorage(response)
      })
    );
  }

  saveInfosToLocalStorage(response: any) {
    localStorage.setItem('jwt', response.accessToken);
    localStorage.setItem('userId', response.userId);
    localStorage.setItem('usernameOrEmail', response.usernameOrEmail);
    // localStorage.setItem('jwt', token);
  }

  signout() {
    // Remove the JWT from local storage
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    localStorage.removeItem('usernameOrEmail');
    // Redirect the user to the login page
    window.location.href = '/login';
  }

  signup(register: RegisterUser): Observable<any> {
    return this.http.post(this.signUpUrl, register);
  }

}