import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from './models/user';
import { UserService } from './user.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = 'api/users';
  private returnUrl = '/';
  constructor(private userService: UserService) { }

  login(email: string, password: string) {
    return this.userService.login(email, password)
    .pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        // add && user.token
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      },
      error => throwError(error)
    ));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
  }
}