import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  setToken(token:string){
    localStorage.setItem('token',token);
  }
  getToken():string|null{
    return localStorage.getItem('token');
  }
  isLoggedIn(){
    return this.getToken()!==null;
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  login(user:any){
    const data=localStorage.getItem('data');
    let success=false;
    if(data!==null){
    const items = JSON.parse(data);
    items.forEach((element: { username: any; password: any; }) => {
      if(element.username===user.username && element.password === user.password){
          this.setToken('abcdefgh');
          success=true;
      }
    })
    }
    return success;
  }
}
