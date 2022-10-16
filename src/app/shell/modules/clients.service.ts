import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Client} from './client.model';
import {LoaderService} from '../../shared/loader/loader.service';
import {map} from 'rxjs/operators';
import {Account} from './krn/accounts/account.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient,
              private loaderService: LoaderService) { }

  getClients(name, lastName, clientKey) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('firstName', name);
    httpParams = httpParams.append('lastName', lastName);
    httpParams = httpParams.append('clientKey', clientKey);

    return this.http.get<Client[]>('clients', {params : httpParams, responseType: 'json'})
      .pipe(
        this.loaderService.useLoader,
        map((data) => {
          return data;
        }));
  }

  getAccounts(clientKey){
    let httpParams = new HttpParams();
    httpParams = httpParams.append('clientKey', clientKey);

    return this.http.get<Account[]>('accounts', {params : httpParams, responseType: 'json'})
      .pipe(
        this.loaderService.useLoader,
        map((data) => {
          return data;
        }));
  }

  addClient(firstName, lastName, plusPoints){
    const account = {firstName, lastName, plusPoints};

    return this.http.put<Account>('clients', account, {observe: 'response'})
      .pipe(this.loaderService.useLoader);
  }

  deleteAccount(accountKey){
    let httpParams = new HttpParams();
    httpParams = httpParams.append('accountKey', accountKey);

    return this.http.delete('accounts', {params : httpParams})
      .pipe(this.loaderService.useLoader);
  }

}
