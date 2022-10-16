import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthResponseModel } from './auth-response.model';
import { LoaderService } from '../loader/loader.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(undefined);
  private expTimer: any;

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  handleAuth = (resData: AuthResponseModel) => {
    const user = new User(
      resData.name,
      resData.username,
      resData.token,
      new Date(resData.expirationDate),
      resData.image
    );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.logoutAfterExp(resData.expirationDate - new Date().getTime());
  }

  login(username, password) {
    return this.http
      .post<AuthResponseModel>('login', {
        username,
        password,
      })
      .pipe(
        this.loaderService.useLoader,
        catchError((err) => throwError(err.error)),
        tap((resData) => this.handleAuth(resData))
      );
  }

  register(name, username, password, rePassword) {
    return this.http
      .post<AuthResponseModel>('register', {
        name,
        username,
        password,
        rePassword
      })
      .pipe(
        this.loaderService.useLoader,
        catchError((err) => throwError(err.error)),
        tap((resData) => this.handleAuth(resData))
      );
  }

  logout() {
    this.user.next(undefined);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.expTimer) {
      clearTimeout(this.expTimer);
    }
    this.expTimer = undefined;
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const user = new User(
      userData.name,
      userData.username,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.image
    );
    if (user.token) {
      this.user.next(user);
    }
    this.logoutAfterExp(
      new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
    );
  }

  logoutAfterExp(expirationDuration: number) {
    this.expTimer = setTimeout(
      () => this.logout(),
      Math.min(2147483647, expirationDuration)
    );
  }


}
