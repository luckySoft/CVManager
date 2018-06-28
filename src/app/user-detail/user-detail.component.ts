import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from './../models/menu-items';
import { User } from 'src/app/models/user';
import { Experience } from './../models/experience';
import { users } from './../models/mock-users';
import { Education } from './../models/education';
import { SocialSkill } from '../models/social-skill';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { delay, share, tap, map } from 'rxjs/operators';

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
    private user$: Observable<User>;

    constructor(configCarousel: NgbCarouselConfig, private route: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.user$ = this.userService.getUser(this.id).pipe(
            map(user => user[0]),
            share(),
        );
    }

    getImage(tech: string): string {
        return 'assets/icons/' + tech + '.png';
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
