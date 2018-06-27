import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from './../models/menu-items';
import { users } from 'src/app/models/mock-users';
import { Experience } from './../models/experience';
import { User } from '../models/user';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  private id;
  private menuItems = MENU_ITEMS;
  private experience: Experience[];
  private user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.user = users.filter(user => user.id === this.id).pop();
    this.experience = this.user.experience;

  }
}
