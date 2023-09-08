import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {
  optionData:any=[];
  answerData:any=[];
  questionData:any[]=[];
  constructor(private router:Router, private service:DataService){};
  ngOnInit(){
    of(this.service.getQuestion()).subscribe(data => {
      this.questionData = data;
    });
    of(this.service.getAnswers()).subscribe(data=>{
      this.answerData=data;
    })
    of(this.service.getOption()).subscribe(data=>{
      this.optionData=data;
    })
    console.log(this.answerData);
    console.log(this.optionData);
  }
  onClick(){
    this.router.navigate(['../form/builder'])
  }
}
