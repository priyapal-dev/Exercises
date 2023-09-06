import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {
  questionData:any=[];
  options: FormControl[] = [];
  otherInput:any[]=[];
  submitAnswers:boolean=false;
  answerData:any[][]=[];
  otherOption:any[]=[];
  questionForm = this.fb.group({
    questionType:['para'],
    questionText: ['',Validators.required],
    options: this.fb.array([]),
    other:[false],
    required:[false],
  });
  constructor(private fb:FormBuilder, private router:Router){
    localStorage.removeItem('answers');
    localStorage.removeItem('other');
    this.questionForm.get('questionType')?.valueChanges.subscribe((value) => {
      if (value === 'list') {
        this.addOption();
      } else {
        while (this.optionControls.length !== 0) {
          this.optionControls.removeAt(0)
        }
      }
    });
  };
  ngOnInit(): void {   
    const questions=localStorage.getItem('question');
    if(questions!==null){
      this.questionData=JSON.parse(questions);
    }
    if(this.questionData.length) this.submitAnswers=true;
    this.otherInput = new Array(this.questionData.length).fill(false);
    this.otherOption = new Array(this.questionData.length).fill('');
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
  submit(){
    let existingData=[]
    let storedData=localStorage.getItem('question');
    if(storedData){
      existingData=JSON.parse(storedData);
    }
    localStorage.setItem("question", JSON.stringify([...existingData,this.questionForm.value]));
    this.ngOnInit();
    this.closeModel();
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

  onSubmit(){
    // console.log(this.answerData);
    // console.log(this.otherInput);
    // console.log(this.otherOption);
    localStorage.setItem('answers',JSON.stringify(this.answerData));
    localStorage.setItem('other',JSON.stringify(this.otherOption));
    this.router.navigate(['../form/answers']);
  }
  answersValid(): boolean {
    let requiredCount = 0;
    let validCount = 0;

    for (let i = 0; i < this.questionData.length; i++) {
        const question = this.questionData[i];
        const answer = this.answerData[i];
        const otherInput = this.otherInput[i];
        const otherOption = this.otherOption[i];
        // console.log(answer);
        if (question.required) {
            requiredCount++;
            // if (question.questionType === 'para') {
            //     if (answer) {
            //         validCount++;
            //     }
            // } else {
              if(answer && answer.length && !otherInput){
                validCount++;
              }
              else if(otherInput && otherOption){
                validCount++;
              }
            // }
        }
      }
      return requiredCount === validCount;
    }
  }
