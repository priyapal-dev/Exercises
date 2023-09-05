import { Component } from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: [''],
    password: ['']
  })
  success=true;
  constructor(private fb:FormBuilder, private router: Router, private auth:AuthService){
    // localStorage.removeItem('token');
    if(this.auth.isLoggedIn()){
      this.router.navigate(['../home']);
    }
  }
  onSubmit(){
    console.log(this.loginForm.value);
    if(this.auth.login(this.loginForm.value)){
      this.router.navigate(['../home']);    
    }
    else{
      this.success=false;
    }
    
    
    // this.router.navigate(['../home']);
  //   const data=localStorage.getItem('data');
  //   if(data!==null){
  //   const items = JSON.parse(data);
  //   items.forEach((element: { username: any; password: any; }) => {
  //     if(element.username===this.loginForm.value.username && element.password === this.loginForm.value.password){
  //         this.router.navigate(['../home']);
  //     }
  //     else{
  //       // this.auth=false;
  //     }
  //   }); 
  // } else{
  //   // this.auth=false;
  //   }
  }
}
