import { Component } from '@angular/core';
import { ChallengesService } from 'src/app/services/challenges.service';

@Component({
  selector: 'app-challenges-dashboard',
  templateUrl: './challenges-dashboard.component.html',
  styleUrls: ['./challenges-dashboard.component.css']
})
export class ChallengesDashboardComponent {

  constructor(private challengeService: ChallengesService) { }

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    return this.challengeService.getAllProjects().subscribe(
      (data) => {
        console.log(data);
        // data is here 
        // use table -MatTable
      }
    );
  }

}
