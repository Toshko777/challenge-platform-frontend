import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const usernameOrEmail = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.signin({ usernameOrEmail, password })
      .subscribe(response => {
        console.log(response);
        const token = response.accessToken;
        if (token) {
          localStorage.setItem('jwt', token);
          console.log('Token saved to localStorage.');
          this.router.navigate(['/dashboard']);
        }

      },
        error => {
          console.error(error);
          this.error = 'Incorrect username or password.';
        }
      );
  }

}
