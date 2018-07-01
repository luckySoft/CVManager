import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Data } from '@angular/router';
import { users, EMPTY_SOCIAL_SKILLS } from './models/mock-users';
import { RegisterForm } from './models/register-form';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';
import { PromiseType } from 'protractor/built/plugins';

const httpOptions = {
  headers: new HttpHeaders(
    { 
      'Content-Type': 'application/json',
      "Accept": "application/json"
   })

};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) { }
  
  createUser(form: RegisterForm): User {
    let user: User = new User();
    user.name = form.firstName;
    user.lastName = form.lastName;
    user.email = form.email;
    user.password = form.password;
    user.jobTitle = form.jobTitle;
    user.description = "New User";
    user.socialSkills = EMPTY_SOCIAL_SKILLS;
    user.devSkills =[];
    user.education = [];
    user.experience = [];
    user.favTechnologies =[];
    user.languages = [];
    user.location = "";
    user.mainProfiles = [];
    return user;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap(users => this.log(`fetched users`)),
      catchError(this.handleError('getUsers', []))
    );
  }

  getUser(id: number): Observable<User> {
    // TODO: send the message _after_ fetching the user
    const url = `${this.url}/?id=${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );

  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.url}/?email=${email}`;
    return this.getUsers().pipe(
      map(users => { 
        let user = users.filter(user => user.email == email && user.password == password)[0];
        return user ? user : new Error("Not Found"); 
      })
    );
  }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(this.url, user, httpOptions).pipe(
      map(user => user ? user : new Error("Not Created"))
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<User>(this.url, user, httpOptions).pipe(
      map(user => user ? user : new Error("Not Updated"))
    );
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (term === "") {
      // if not search term, return empty user array.
      return this.getUsers();
    }
    return this.http.get<User[]>(`${this.url}/?name=${term}`).pipe(
      tap(_ => this.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    console.log(message);
  }
}
