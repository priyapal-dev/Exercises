import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent {
  questionData:any=[];
  answerData:any=[];
  otherData:any=[];
  length:number=0;
  constructor(private router:Router){};
  ngOnInit(){
    const questions=localStorage.getItem('question');
    const answers=localStorage.getItem('answers');
    const other=localStorage.getItem('other');
    if(questions){
      this.questionData=JSON.parse(questions);
    }
    if(answers){
      this.answerData=JSON.parse(answers);
    }
    if(other){
      this.otherData=JSON.parse(other);
    }
    length=this.questionData.length;
  }
  
  onClick(){
    this.router.navigate(['../form/builder'])
  }
}
