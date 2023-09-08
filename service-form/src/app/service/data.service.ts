import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private questions: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); 
  private answers: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private option: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }
  setOption(value:any){
    // console.log(value);
    // const current=this.option.value;
    const current=[];
    current.push(value);
    // console.log(current);
    this.option.next(current);
    // console.log(this.option);
    console.log(this.option.value);
  }
  setQuestion(value:any){
    const current = this.questions.value; 
    current.push(value);
    this.questions.next(current);
  }
  setAnswer(value:any){
    // const current = this.answers.value; 
    const current=[];
    current.push(value);
    this.answers.next(current);
    console.log(this.answers.value);
  }
  getQuestion(){
    return this.questions.value;
  }
  getAnswers(){
    return this.answers.value;
  }
  getOption(){
    return this.option.value;
  }
}
