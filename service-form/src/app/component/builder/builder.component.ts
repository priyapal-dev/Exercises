import { Component } from '@angular/core';
import { FormArray, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Question, QuestionWithAnswer } from 'src/app/service/data.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {
  answerData:QuestionWithAnswer[]=[];
  submitAnswer:boolean=false;
  questionForm = this.fb.group({
    questionType:['para'],
    questionText: ['',Validators.required],
    options: this.fb.array([]),
    allowOther:[false],
    required:[false],
  });
  finalForm=this.fb.group({
    quesWithAns:this.fb.array([]),
  })

  constructor(private fb:FormBuilder, private router:Router,private service:DataService){
  };
  ngOnInit():void{
    this.questionForm.get('questionType')?.valueChanges.subscribe((value) => {
      if (value === 'list') {
        this.addOption();
      } else {
        while (this.optionControls.length !== 0) {
          this.optionControls.removeAt(0)
        }
      }
    });
    const questions: Question[] = this.service.getQuestion();
    const quesWithAnsArray = this.finalForm.get('quesWithAns') as FormArray;
    quesWithAnsArray.clear();
    questions.forEach((question) => {
      quesWithAnsArray.push(
        this.fb.group({
          questionType: question.questionType,
          questionText: question.questionText,
          required: question.required,
          allowOther: question.allowOther,
          options: [question.options],
          answerText: question.answerText,
          answerList: this.fb.array([]),
          otherInput:question.otherInput,
        })
      );

    });
    if(quesWithAnsArray && quesWithAnsArray.length)
    this.submitAnswer=true;    
  }
  
  
  
  toggleSpecify(event:any,index:any){
    if(event.target.checked){
      const specify=document.getElementById('other'+index);
      if(specify){
        specify.style.display='block';}
    }
    else{
      const specify=document.getElementById('other'+index);
      if(specify){
        specify.style.display='none';
      }
    }
  }
  
  handleOptions(e:any,index:number,j:number){ 
    let i=0;
    for(let item of this.quesWithAnsControls.controls){
      if(i===index){
        let answer=item.get('answerList')?.value?item.get('answerList')?.value:[];
        // console.log(answer);     
        if(e.target.checked){
          answer.push(e.target.value);
        }
        else{
          let t=0;
          let valueToRemove = e.target.value;
          let valueIndex = answer.findIndex((val: string) => val === valueToRemove);

          if (valueIndex !== -1) {
            answer.splice(valueIndex,1);
          }
        }
      }
      i++;
    }
  }
  get optionControls(){
    return this.questionForm.get('options') as FormArray;
  }
  addOption() {
    this.optionControls.push(this.fb.control('', Validators.required));
  }
  removeOption(index: number) {
    this.optionControls.removeAt(index);
  }
  openModel(){
    const modalDiv=document.getElementById('builderModal');
    if(modalDiv!=null){
      modalDiv.style.display='block';
    }
  }
  closeModel(){
    const modalDiv=document.getElementById('builderModal');
    if(modalDiv!=null){
      modalDiv.style.display='none';
    }
    this.questionForm.reset({
      questionType: 'para',
      questionText: '',
      options: [],
      allowOther: false,
      required: false,
    });
    while (this.optionControls.length !== 0) {
      this.optionControls.removeAt(0)
    }
  }
  onSubmit(){
    // console.log(this.finalForm.value);
    let answerData: QuestionWithAnswer[]=[];
    for(const item of this.quesWithAnsControls.controls){
      const questionText=item.get('questionText')?.value;
      let answer:string|string[];
      if(item.get('questionType')?.value==='para'){
        answer=`Answer: ${item.get('answerText')?.value}`;
      }
      else{ 
        if(item.get('answerList')?.value){
          answer=item.get('answerList')?.value; 
          if(item.get('otherInput')?.value){
            answer=[...answer,`Other: ${item.get('otherInput')?.value}`] 
          }
        }
        else{
          answer=`Other: ${item.get('otherInput')?.value}`;
        }
          if (Array.isArray(answer)) 
            answer=answer.join('\n');
            answer = `Selected Options: \n${answer}`;
      }
      answerData.push({questionText,answer});
    }
    this.service.setAnswer(answerData);
    this.router.navigate(['../form/answer']);
  }
  get quesWithAnsControls(): FormArray{
    return this.finalForm.get('quesWithAns') as FormArray;
  }
  finalValidation(){
    let index=0;
    let count=0;
    let total=0;
    for(const item of this.quesWithAnsControls.controls){
      if(item.get('required')?.value){
        total++;
        if(item.get('questionType')?.value==='list'){
          const specify=document.getElementById('other'+index);
          if(specify?.style.display==="block"){
            if(item.get('otherInput')?.value)
            count++;
          }
          else if(item.get('answerList')?.value?.length){
            count++;
          }
        }
      else{
        if(item.get('answerText')?.value)
        count++;
      }}
      index++;
    }

    return count===total;
  }
  submit(){
    this.submitAnswer=true;
    const ques: Question={
      questionType: this.questionForm.get('questionType')?.value || 'para',
      questionText:this.questionForm.get('questionText')?.value||'',
      options: (this.questionForm.get('options')?.value as string[])||[], 
      allowOther: this.questionForm.get('allowOther')?.value || false,
      required: this.questionForm.get('required')?.value || false,
      answerText: (''),
      answerList: ([]),
      otherInput:(''),
    }
    this.service.setQuestion(ques);
    const quesFormGroup = this.fb.group({
      questionType: [ques.questionType],
      questionText: [ques.questionText],
      options: [ques.options],
      allowOther: [ques.allowOther],
      otherInput:[''],
      required: [ques.required],
      answerList: this.fb.array([]),
      answerText: [''],
    });

    const quesWithAns = this.finalForm.get('quesWithAns') as FormArray;
    quesWithAns.push(quesFormGroup);
    this.closeModel();
  }
}
