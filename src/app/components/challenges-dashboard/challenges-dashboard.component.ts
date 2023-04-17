import { Component, OnInit, ViewChild } from '@angular/core';
import { ChallengesService } from 'src/app/services/challenges.service';
import { MatTableDataSource } from '@angular/material/table';
import { Challenge } from 'src/app/models/challenge';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-challenges-dashboard',
  templateUrl: './challenges-dashboard.component.html',
  styleUrls: ['./challenges-dashboard.component.css']
})
export class ChallengesDashboardComponent implements OnInit {

  dataSource: MatTableDataSource<Challenge>;

  totalElementsCount: number;

  displayedColumns: string[] = ['name', 'description', 'button'];

  constructor(
    private challengeService: ChallengesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchChallenges(0, 10);
  }

  fetchChallenges(pageNumber: number, pageSize: number) {
    let params = new HttpParams().set('pageNo', pageNumber).set('pageSize', pageSize);
    return this.challengeService.getAllChallenges(params).subscribe(
      (data) => {
        this.totalElementsCount = data.totalElements;
        this.dataSource = new MatTableDataSource(data.content);
      }
    );
  }

  onPageChanged(event: any) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.fetchChallenges(pageIndex, pageSize);
  }

  onButtonClick(data: Challenge) {
    // console.log(data);
    this.router.navigate(['/challenge/', data.id], { state: { data: data } });
  }

}
