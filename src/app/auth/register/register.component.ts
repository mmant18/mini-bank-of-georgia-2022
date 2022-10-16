import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Validators } from 'src/app/shared/validators';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'bg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  rePasswordIsWrong = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(undefined, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
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
      rePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
    });
  }

  onRegister() {
    if (this.form.invalid) {
      return;
    }
    const name = this.get('name').value;
    const username = this.get('username').value;
    const password = this.get('password').value;
    const rePassword = this.get('rePassword').value;

    if (rePassword === password){
      this.rePasswordIsWrong = false;
      this.authService.register(name, username, password, rePassword).subscribe(
        (resData) => {
          console.log(resData);
          this.form.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }else {
      this.rePasswordIsWrong = true;
    }
  }

  get(controlName) {
    return this.form.get(controlName);
  }

  errors(controlName) {
    return this.get(controlName)?.errors
      ? Object.values(this.get(controlName).errors)
      : [];
  }

}
