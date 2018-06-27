import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from './../models/menu-items';
import { Experience } from './../models/experience';
import { User } from '../models/user';
import { users } from 'src/app/models/mock-users';
import { UserService } from '../user.service';

import { delay, share, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  private id;
  private menuItems = MENU_ITEMS;
  private user$: Observable<User>;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.user$ = this.userService.getUser(this.id).pipe(
      map(user => user[0]),
      share(),
      tap(user => console.log(user))
    );

  }

}