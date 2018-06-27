import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from './../models/menu-items';
import { User } from 'src/app/models/user';
import { Experience } from './../models/experience';
import { users } from './../models/mock-users';
import { Education } from './../models/education';
import { SocialSkill } from '../models/social-skill';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    private id;
    private technologies: Array<string>;
    private videoId;
    private education: Education[];
    private experience: Experience[];
    private skills: SocialSkill[];
    private menuItems = MENU_ITEMS;
    private showDetails = false;
    private user: User;

    constructor(configCarousel: NgbCarouselConfig, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.user = users.filter(user => user.id === this.id).pop();
        this.videoId = this.user.videoId;
        this.technologies = new Array<string>();
        for (let tech of this.user.favTechnologies) {
            this.technologies.push('assets/icons/' + tech + '.png');
        }
        this.education = this.user.education;
        this.experience = this.user.experience;
        this.skills = this.user.socialSkills;
    }

    getTechnologies(experience: Array<Experience>): Array<string> {
        let technologies = new Array<string>();
        experience.forEach(exp => {
            exp.technologies.forEach(tech => {
                technologies.push(tech);
            });
        });    
        return technologies;
    }
}
