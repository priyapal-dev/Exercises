import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  submitted:boolean=false;
  registerForm:FormGroup;
  
  constructor(private fb:FormBuilder, private router: Router){
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.maxLength(15)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        Validators.minLength(8), 
      ]],
      confirm:['', [Validators.required]]
    }
    ,{
      validators:this.passwordMatch('password', 'confirm')
    }
    );
  }
  
  get user(){
    return this.registerForm.controls
  }
  passwordMatch(password:string, confirm:string){
    return(formGroup:FormGroup)=>{
      const first=formGroup.controls[password];
      const second=formGroup.controls[confirm];
      if(first.errors && !second.errors?.['passwordMatch']){
        return;
      }
      if(first.value!==second.value){
        second.setErrors({passwordMatch:true});
      }
      else{
        second.setErrors(null);
      }
    }
  }
  onSubmit(){
    this.submitted=true;
    if(this.registerForm.invalid) return;
    let existingData=[]
    let storedData=localStorage.getItem('data');
    if(storedData){
      existingData=JSON.parse(storedData);
    }
    const userExists = existingData.some((user: { username: string | null | undefined; }) => user.username === this.registerForm.value.username);
    const emailExists = existingData.some((user: { email: string | null | undefined; }) => user.email === this.registerForm.value.email);
    if(userExists){
      alert('Username already exists!');
    }
    else if(emailExists){
      alert('Email already exists!');
    }
    else{
      localStorage.setItem("data", JSON.stringify([...existingData,this.registerForm.value]));
      this.router.navigate(['../login']);
    }
  }  
}
