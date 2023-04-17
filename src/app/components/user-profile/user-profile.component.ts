import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Challenge } from 'src/app/models/challenge';
import { User } from 'src/app/models/user';
import { UserChallenge } from 'src/app/models/userChallenge';
import { ChallengesService } from 'src/app/services/challenges.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User | undefined;
  userId: number = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

  challenges: Challenge[];

  inProgress: number;
  finished: number;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private challengesService: ChallengesService
  ) { }


  ngOnInit(): void {
    this.getUser();
    this.getUserChallenges();

  }

  getUser(): void {
    this.usersService.getUser(this.userId).subscribe(user => this.user = user);
  }

  getUserChallenges(): void {
    this.challengesService.getUserChallenges(this.userId).subscribe(response => {
      this.inProgress = this.countInProgress(response);
      this.finished = this.countFinished(response);

    });

  }

  countFinished(challenges: UserChallenge[]): number {
    let finishedCount = challenges.reduce((count, challenge) => {
      if (challenge.completed) {
        count++;
      }
      return count;
    }, 0);
    return finishedCount;
  }

  countInProgress(challenges: UserChallenge[]): number {
    const unfinishedItems = challenges.filter(challenge => challenge.completed === null);
    const unfinishedItemCount = unfinishedItems.length;
    return unfinishedItemCount;
  }

}
