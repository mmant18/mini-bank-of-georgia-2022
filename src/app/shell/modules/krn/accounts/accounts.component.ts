import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Account} from './account.model';
import {ClientsService} from '../../clients.service';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts: Account[] = [];

  constructor(private router: Router,
              private clientsService: ClientsService) { }

  ngOnInit(): void {
    const clientKey = JSON.parse(localStorage.getItem('clientKey'));
    this.clientsService.getAccounts(clientKey).subscribe( (data) => {
      this.accounts = data;
    }, error => {
      console.log(error);
    });
  }

  addAccount(){
    this.router.navigate(['/krn/createAccount']);
  }

  deleteAccount(accountKey){
    this.clientsService.deleteAccount(accountKey).subscribe();
  }

}
