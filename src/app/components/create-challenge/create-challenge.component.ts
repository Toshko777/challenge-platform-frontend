import { Component, OnInit } from '@angular/core';
import { NewChallenge } from 'src/app/models/newChallenge';
import { ChallengesService } from 'src/app/services/challenges.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css']
})
export class CreateChallengeComponent implements OnInit {
  challenge: NewChallenge;

  challengeForm: FormGroup;

  userId = parseInt(localStorage.getItem("userId")!, 10);

  constructor(
    private formBuilder: FormBuilder,
    private challengesService: ChallengesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.challengeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  createChallenge(): void {
    if (this.challengeForm.valid) {
      this.challenge = this.challengeForm.value;
      this.challenge.creatorId = this.userId;
      this.challengesService.createChallenge(this.challenge).subscribe(response => {
        console.debug(response);
        this.snackBar.open('Challenge created successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
        // push popup with "success" -> when succeeded 
      }, err => {
        console.log('Failed to create challenge: ', err);
        this.snackBar.open('There was a problem!', 'Close', { duration: 3000 });
      });

    }
  }

  getErrorMessage(controlName: string) {
    if (this.challengeForm.get(controlName).hasError('required')) {
      return 'This field is required';
    }
  }

}
