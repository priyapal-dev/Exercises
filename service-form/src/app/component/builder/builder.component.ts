import { Component } from '@angular/core';
import { FormArray, FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {
  questionData:any[]=[];
  // other:any=[];
  answerData:any=[];
  optionData:any=[];
  submitAnswer:boolean=false;
  questionForm = this.fb.group({
    questionType:['para'],
    questionText: ['',Validators.required],
    options: this.fb.array([]),
    other:[false],
    required:[false],
  });
  constructor(private fb:FormBuilder, private router:Router,private service:DataService){
    this.questionForm.get('questionType')?.valueChanges.subscribe((value) => {
      // console.log(this.questionForm.get('questionType')?.value)
      if (value === 'list') {
        this.addOption();
      } else {
        while (this.optionControls.length !== 0) {
          this.optionControls.removeAt(0)
        }
      }
    });
  };
  ngOnInit():void{
    of(this.service.getQuestion()).subscribe(data => {
      this.questionData = data;
    });
    // of(this.service.getAnswers()).subscribe(data => {
    //   this.answerData = data[0];
    // });
    // of(this.service.getOption()).subscribe(data => {
    //   this.optionData = data[0];
    // });
    this.optionData = new Array(this.questionData.length).fill('');
    this.answerData = new Array(this.questionData.length).fill('');
    if(this.questionData.length>=1)
    this.submitAnswer=true;
  }
  toggleSpecify(event:any,index:any){
    if(event.target.checked){
      const specify=document.getElementById('object'+index);
      if(specify){
        specify.style.display='block';}
    }
    else{
      const specify=document.getElementById('object'+index);
      if(specify){
        specify.style.display='none';
      }
      this.optionData[index]='';
    }
  }
  toggleOption(option: any, index:number, event:any) {
    if(!this.answerData[index]){
      this.answerData[index]=[];
    }
    if(event.target.checked){
      this.answerData[index].push(option);
    }
    else{
      const i=this.answerData[index].indexOf(option);
      if (i !== -1) {
        this.answerData[index].splice(i, 1);
      }
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
      other: false,
      required: false,
    });
    while (this.optionControls.length !== 0) {
      this.optionControls.removeAt(0)
    }
  }
  onSubmit(){
    this.questionData.push()
    this.service.setOption(this.optionData);
    this.service.setAnswer(this.answerData);
    this.router.navigate(['../form/answer']);
  }
  submit(){
    this.service.setQuestion(this.questionForm.value);
    this.submitAnswer=true;
    this.answerData.push('');
    this.optionData.push('');
    this.closeModel();
  }
  
  requiredCheck(): boolean{
    let requiredCount = 0;
    let validCount = 0;
    for (let i = 0; i < this.questionData.length; i++) {
      // const checkbox = document.getElementById('other'+i) as HTMLInputElement;
        const question = this.questionData[i];
        const answer = this.answerData[i];
        const otherOption = this.optionData[i];
        if (question.required) {
            requiredCount++;  
            if(answer && answer.length){
              // if(otherOption)
              validCount++;
            }
            else if(otherOption){
              validCount++;
            }
        }
      }
      return requiredCount === validCount;
  }
}
