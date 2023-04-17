import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Challenge } from '../../models/challenge'
import { ChallengesService } from 'src/app/services/challenges.service';
import { UserChallenge } from 'src/app/models/userChallenge';
import { StartOrFinishChallenge } from 'src/app/models/startOrFinishChallenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  userId = parseInt(localStorage.getItem("userId")!, 10);
  challengeId: number;
  challenge: Challenge;
  challenges: UserChallenge[];

  started: boolean = false;
  finished: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private challengesService: ChallengesService
  ) {
    this.challenge = history.state.data;
    this.challengeId = this.challenge.id;
  }

  ngOnInit(): void {
    this.checkButtonsStatus(this.challengeId);
  }

  retrieveChallengeInformation(): void {

  }

  startChallenge(challengeId: number): void {
    const challengeStatus: StartOrFinishChallenge = {
      accountId: this.userId,
      challengeId: challengeId
    }
    this.challengesService.startChallenge(challengeStatus).subscribe(response => {
      console.debug("Successfull started challenge " + this.userId + "!")
      this.checkButtonsStatus(this.challengeId);
    })
  }

  finishChallenge(challengeId: number): void {

    const challengeStatus: StartOrFinishChallenge = {
      accountId: this.userId,
      challengeId: challengeId
    }
    this.challengesService.finishChallenge(challengeStatus).subscribe(response => {
      console.debug("Successfull finished challenge from " + this.userId + "!")
      this.checkButtonsStatus(this.challengeId);
    })
  }

  checkButtonsStatus(challengeId: number): void {
    this.challengesService.getUserChallenges(this.userId).subscribe(
      response => {
        this.challenges = response;
        const foundChallenge = this.challenges.find(startedChall => startedChall.challengeId === challengeId);
        // if found challenge exists => started
        if (foundChallenge) {
          this.started = true;
          // check if challenge is completed
          if (foundChallenge.completed) {
            this.finished = true;
          }
        }

      }
    )
  }

}
