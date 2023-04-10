import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {usernameOrEmail: '', password: ''};

  constructor(private authService: AuthService) { }

  login() {
    this.authService.signin(this.credentials).subscribe(
      response => {
        // handle successful login
        const token = response.accessToken;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({ username: this.credentials.usernameOrEmail, token: token }));
        }

        console.log("response: ", response)
      },
      error => {
        // handle login error
      }
    );
  }
}
