import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Client} from '../../client.model';
import {ClientsService} from '../../clients.service';

@Component({
  selector: 'bg-bpm000',
  templateUrl: './bpm000.component.html',
  styleUrls: ['./bpm000.component.scss'],
})
export class Bpm000Component implements OnInit {
  searchIsOn = false;
  searchForm: FormGroup;
  clients: Client[] = [];


  constructor(
    private router: Router,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      clientKey: new FormControl('')
    });
  }

  addClient(){
    this.router.navigate(['/bpm/bpm001']);
  }

  getClients(){
    const firstName = this.get('firstName').value;
    const lastName = this.get('lastName').value;
    const clientKey = this.get('clientKey').value;

    this.searchIsOn = true;

    this.clientsService.getClients(firstName, lastName, clientKey).subscribe( (data) => {
      this.clients = data;
    }, error => {
      console.log(error);
    });
  }

  moveClient(client: Client){
    localStorage.setItem('clientData', JSON.stringify(client));
    this.router.navigate(['/krn']);
  }

  get(controlName){
    return this.searchForm.get(controlName);
  }

}
