import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private questions: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
  private questionsWithAnswers: BehaviorSubject<QuestionWithAnswer[]> = new BehaviorSubject<QuestionWithAnswer[]>([]); 

  constructor() { }
  
  setQuestion(value:Question){
    const current = this.questions.value; 
    current.push(value);
    this.questions.next(current);
    // console.log(this.questionsSubject.value);
  }
  setAnswer(answer: QuestionWithAnswer[]) {
    const current = [];
    current.push(...answer);
    this.questionsWithAnswers.next(current);
    // console.log(this.questionsWithAnswers.value);
  }
  getQuestion(){
    // console.log(this.questions.value);
    return this.questions.value;
  }
  getAnswers(){
    return this.questionsWithAnswers.value;
  }
  
}
export interface Question{
  questionType: string;
  questionText: string;
  options?: string[];
  allowOther?:boolean;
  required:boolean;
  answerText:string;
  answerList: string[];
  otherInput: string;
}
export interface QuestionWithAnswer{
  questionText:string;
  answer: string;
}
