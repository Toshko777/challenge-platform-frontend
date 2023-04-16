import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User | undefined;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.usersService.getUser(id).subscribe(user => this.user = user);
  }

}
