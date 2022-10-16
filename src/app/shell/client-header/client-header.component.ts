import {AfterContentChecked, Component, } from '@angular/core';
import {Client} from '../modules/client.model';
import {Router} from '@angular/router';

@Component({
  selector: 'bg-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements  AfterContentChecked {
  client: Client;

  constructor(private router: Router) { }


  ngAfterContentChecked(): void {
    debugger;
    console.log(JSON.parse(localStorage.getItem('clientData')));
    this.client = JSON.parse(localStorage.getItem('clientData'));
  }

  logout(){
    localStorage.removeItem('clientData');
    this.router.navigate(['/bpm']);
  }

}
