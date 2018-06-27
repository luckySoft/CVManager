import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from './../models/menu-items';
import { users } from 'src/app/models/mock-users';
import { Education } from '../models/education';
import { User } from '../models/user';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  private id;
  private menuItems = MENU_ITEMS;
  private education: Education[];
  private user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.user = users.filter(user => user.id === this.id).pop();
    this.education = this.user.education;

  }
}
