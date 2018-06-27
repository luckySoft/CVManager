import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from './../models/menu-items';
import { HttpClient } from 'selenium-webdriver/http';
import { users } from 'src/app/models/mock-users';
import { User } from '../models/user';

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
  private user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.user = users.filter(user => user.id === this.id).pop();
    this.developmentStack = this.user.devSkills;
  }
}
