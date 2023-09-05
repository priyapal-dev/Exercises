import { Component } from '@angular/core';
import { Sample } from '../sample';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  sample = new Sample('','', '', '', '', '', false);
  submitted = false;
  onSubmit(){
    this.submitted=true;
    if(this.sample.firstname===''||this.sample.lastname===''||this.sample.username===''||this.sample.email===''||this.sample.password===''||this.sample.confirmPassword===''||this.sample.verify===false) return;
    console.log(this.sample);
  }
  confirmPasswordMatch(): boolean{
    return this.sample.password===this.sample.confirmPassword;
  }
}
