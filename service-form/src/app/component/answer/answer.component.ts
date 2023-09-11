import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, QuestionWithAnswer } from 'src/app/service/data.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {
  questionWithAnswer: QuestionWithAnswer[] = [];
  constructor(private router:Router, private service:DataService){};
  ngOnInit(){
    this.questionWithAnswer = this.service.getAnswers();
    // console.log(this.questionWithAnswer);
  }
  onClick(){
    this.router.navigate(['../form/builder'])
  }
  replaceNewlines(text: string): string {
    return text.replace(/\n/g, '<br>');
  }
}
