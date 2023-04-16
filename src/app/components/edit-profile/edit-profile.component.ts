import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userId = parseInt(localStorage.getItem("userId")!, 10);
  user: User | undefined;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usersService.getUser(this.userId).subscribe(user => {
      this.user = user;
      this.createForm();
    });
  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit(): void {
    if (this.userForm.valid) {
      this.user = this.userForm.value;
      console.log(this.userForm.value);
      this.usersService.updateUser(this.userId, this.user).subscribe(() => {
        this.authService.signout();
      }, error => {
        console.log(error);
      });
    }
  }

  getErrorMessage(controlName: string, errorName: string): string {
    const control = this.userForm.controls[controlName];
    return control.hasError(errorName) ? `Invalid ${errorName}` : '';
  }

}
