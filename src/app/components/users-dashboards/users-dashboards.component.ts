import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-dashboards',
  templateUrl: './users-dashboards.component.html',
  styleUrls: ['./users-dashboards.component.css']
})
export class UsersDashboardsComponent implements OnInit {

  dataSource = new MatTableDataSource<User>();

  totalElementsCount: number;

  displayedColumns: string[] = ['name', 'username', 'created', 'button'];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchUsers(0, 10);
  }

  fetchUsers(pageNumber: number, pageSize: number): void {
    let params = new HttpParams().set('pageNo', pageNumber).set('pageSize', pageSize);
    this.usersService.getAllUsers(params).subscribe(
      (data) => {
        this.totalElementsCount = data.totalElements;
        console.debug(data);
        this.dataSource.data = data.content;
      }
    );
  }

  onPageChanged(event: any) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.fetchUsers(pageIndex, pageSize);
  }

  // Function to handle button click
  onButtonClick(data: User): void {
    console.debug(data);
    this.router.navigate(['/user/', data.id]);
  }

}
