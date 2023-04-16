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
export class UsersDashboardsComponent implements OnInit{

  dataSource = new MatTableDataSource<User>();

  displayedColumns: string[] = ['name', 'username', 'created', 'button'];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.usersService.getAllUsers().subscribe(
      (data) => {
        console.log(data);
        this.dataSource.data = data.content;
      }
    );
  }

  // Function to handle button click
  onButtonClick(data: User): void {
    console.log(data);
    this.router.navigate(['/user/', data.id]);
  }

}
