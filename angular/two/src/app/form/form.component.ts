import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  submitted=false;
  form = new FormGroup({  
  username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  room: new FormControl(''),
  arrival: new FormControl('', Validators.required),
  departure: new FormControl('', Validators.required),
  guests: new FormControl('', Validators.required),
  pickup: new FormControl(''),
  flight: new FormControl(''),
  request: new FormControl(''),
})
get user(){
  return this.form.controls
}
  onSubmit(){
    this.submitted=true;
    if(this.form.invalid) return;
    console.log(this.form.value);
  }
}
