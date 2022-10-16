import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Validators } from 'src/app/shared/validators';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'bg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  closeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl(undefined, [
        Validators.required,
        Validators.pattern(/^\S*$/, 'უსფეისო'),
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
    });
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }
    const username = this.get('username').value;
    const password = this.get('password').value;

    this.authService.login(username, password).subscribe(
      (resData) => {
        console.log(resData);
        this.router.navigate(['/']);
        this.form.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  get(controlName) {
    return this.form.get(controlName);
  }

  errors(controlName) {
    return this.get(controlName)?.errors
      ? Object.values(this.get(controlName).errors)
      : [];
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
}
