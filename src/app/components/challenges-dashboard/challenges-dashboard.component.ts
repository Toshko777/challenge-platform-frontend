import { Component, OnInit } from '@angular/core';
import { ChallengesService } from 'src/app/services/challenges.service';
import { MatTableDataSource } from '@angular/material/table';
import { Challenge } from 'src/app/models/challenge';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenges-dashboard',
  templateUrl: './challenges-dashboard.component.html',
  styleUrls: ['./challenges-dashboard.component.css']
})
export class ChallengesDashboardComponent implements OnInit {

  dataSource = new MatTableDataSource<Challenge>();

  displayedColumns: string[] = ['name', 'description', 'creator', 'button'];

  constructor(
    private challengeService: ChallengesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllChallenges();
  }

  getAllChallenges() {
    return this.challengeService.getAllChallenges().subscribe(
      (data) => {
        // console.log(data);
        this.dataSource.data = data.content;
      }
    );
  }

  onButtonClick(data: Challenge) {
    // console.log(data);
    this.router.navigate(['/challenge/', data.id], {state: { data: data }});
  }

}
