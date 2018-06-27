import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from './../models/menu-items';
import { Experience } from './../models/experience';
import { User } from '../models/user';
import { users } from 'src/app/models/mock-users';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

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