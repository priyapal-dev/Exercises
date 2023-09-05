import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  submit=false;
  userData:any[]=[];
  modalText='Edit';
  form=this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.maxLength(15)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), 
      ]],
  })
  get user(){
    return this.form.controls
  }
  constructor(private fb:FormBuilder, private auth:AuthService){
  };

  ngOnInit(): void {
    const data=localStorage.getItem('data');
    if(data!==null){
      this.userData=JSON.parse(data);
    }
  }
  logout(){
    this.auth.logout();
  }
  handleDelete(index: any){
    this.userData.splice(index,1);
    localStorage.setItem('data', JSON.stringify(this.userData));
  }
  openModal(index:any){
    const modalDiv=document.getElementById('exampleModal');
    if(modalDiv!=null){
      modalDiv.style.display='block';
    }
    if(index!==-1){
      this.modalText='Edit';
      this.user['firstname'].setValue(this.userData[index].firstname);
      this.user['lastname'].setValue(this.userData[index].lastname);
      this.user['username'].setValue(this.userData[index].username);
      this.user['email'].setValue(this.userData[index].email);
      this.user['password'].setValue(this.userData[index].password);
      this.user['gender'].setValue(this.userData[index].gender);  
      console.log(this.userData[index])
    }
    else{
      this.modalText='Add';
      this.user['firstname'].setValue('');
      this.user['lastname'].setValue('');
      this.user['username'].setValue('');
      this.user['email'].setValue('');
      this.user['password'].setValue('');
      this.user['gender'].setValue('');
    }
  }
  closeModal(){
    const modalDiv=document.getElementById('exampleModal');
    if(modalDiv!=null){
      modalDiv.style.display='none';
    }
  }
  saveChanges(){
    this.submit=true;
    if(this.form.invalid) return;
    const index=this.userData.findIndex((user)=>user.username===this.user['username'].value);
    if(index!==-1){
      this.userData[index]={
        firstname: this.user['firstname'].value,
        lastname: this.user['lastname'].value,
        username: this.user['username'].value,
        email: this.user['email'].value,
        password: this.user['password'].value,
        gender: this.user['gender'].value,
      };
    }
    else{
      const newUser={
        firstname: this.user['firstname'].value,
        lastname: this.user['lastname'].value,
        username: this.user['username'].value,
        email: this.user['email'].value,
        password: this.user['password'].value,
        gender: this.user['gender'].value,
      }
      this.userData.push(newUser);
    }
    localStorage.setItem('data', JSON.stringify(this.userData));
    this.closeModal();
  }
}
