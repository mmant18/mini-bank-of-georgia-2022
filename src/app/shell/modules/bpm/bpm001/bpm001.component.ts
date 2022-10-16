import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ClientsService} from '../../clients.service';
import {Router} from '@angular/router';
import {Validators} from '../../../../shared/validators';

@Component({
  selector: 'bg-bpm001',
  templateUrl: './bpm001.component.html',
  styleUrls: ['./bpm001.component.scss']
})
export class Bpm001Component implements OnInit {
  registrationForm: FormGroup;

  constructor(private clientsService: ClientsService,
              private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(undefined, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)]),
      lastName: new FormControl(undefined, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)]),
      plusPoints: new FormControl(undefined, [
        Validators.min(0)])
    });
  }

  OnSubmitForm() {
    if (this.registrationForm.invalid) {
      return;
    }
    const firstName = this.get('firstName').value;
    const lastName = this.get('lastName').value;
    const plusPoints = this.get('plusPoints').value;

    this.clientsService.addClient(firstName, lastName, plusPoints).subscribe( () => {
        this.router.navigate(['/bpm/bpm000']);
      }
    );

  }

  get(controlName){
    return this.registrationForm.get(controlName);
  }

}
