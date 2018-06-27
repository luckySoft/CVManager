import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { users } from 'src/app/models/mock-users';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap, scan
 } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from './../user.service';
import { AppComponent } from './../app.component';
import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  users$: Observable<User[]>;
  private searchTerms = new Subject<string>();
 
  constructor(private userService: UserService) {
  }
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    
    this.users$ = this.searchTerms.pipe(
    // wait 300ms after each keystroke before considering the term
      debounceTime(300),
    // ignore new term if same as previous term
      distinctUntilChanged(),
    // switch to new search observable each time the term changes   
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
  }
  ngAfterViewInit() {
    this.search("");
  }

  getMainProfile(user: User): string {
    return user.mainProfiles.filter(profile => profile.main)[0].img;
  }
}