import { Component, OnInit } from '@angular/core';
import { ChallengesService } from 'src/app/services/challenges.service';
import { MatTableDataSource } from '@angular/material/table';
import { Challenge } from 'src/app/models/challenge';

@Component({
  selector: 'app-challenges-dashboard',
  templateUrl: './challenges-dashboard.component.html',
  styleUrls: ['./challenges-dashboard.component.css']
})
export class ChallengesDashboardComponent implements OnInit {

  dataSource = new MatTableDataSource<Challenge>();

  displayedColumns: string[] = ['name', 'description', 'button'];

  constructor(private challengeService: ChallengesService) { }

  ngOnInit() {
    this.getAllChallenges();
  }

  getAllChallenges() {
    return this.challengeService.getAllChallenges().subscribe(
      (data) => {
        console.log(data);
        this.dataSource.data = data.content;
      }
    );
  }

  // Function to handle button click
  onButtonClick(data: Challenge) {
    // todo
    console.log(data);
  }

}
