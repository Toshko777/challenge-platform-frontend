import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar
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
      .subscribe(() => {
        console.debug("successful log in");
        this.router.navigate(['/dashboard']);
      },
        error => {
          console.debug("Error status: ", error.status);
          console.debug("Error message: ", error.message);
          this.snackBar.open('Incorect username/email or password!', 'Close', { duration: 3000 });
        }
      );
  }

}
