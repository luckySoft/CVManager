import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from './../models/menu-items';
import { users } from 'src/app/models/mock-users';
import { Education } from '../models/education';
import { User } from '../models/user';
import { UserService } from './../user.service';
import { delay, share, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

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
