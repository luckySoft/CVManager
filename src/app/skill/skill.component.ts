import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from './../models/menu-items';
import { HttpClient } from 'selenium-webdriver/http';
import { users } from 'src/app/models/mock-users';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { delay, share, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  private id;
  private menuItems = MENU_ITEMS;
  private developmentStack;
  private designStack;
  private otherStack;
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
