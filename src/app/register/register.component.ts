import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AlertService } from '../alert.service';
import { first } from 'rxjs/operators';
import { RegisterForm } from '../models/register-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    let registerFormData: RegisterForm = this.registerForm.value;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (registerFormData.password != registerFormData.confirmPassword) {
      this.alertService.error("Passwords do not match to each other!");
      return;
    }
    this.loading = true;
    this.userService.addUser(this.userService.createUser(registerFormData))
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error("Registration failed. Please try again.");
          this.loading = false;
        });
  }
}
