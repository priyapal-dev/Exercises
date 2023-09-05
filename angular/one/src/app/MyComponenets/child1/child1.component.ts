import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.css'],
})
export class Child1Component {
  inputValue: string='';

  constructor(private dataService: DataService) {
    this.dataService.inputValueSubject$.subscribe((value) => {
      this.inputValue = value;
    });
  }
  
  onInputChange(){
    this.dataService.setInputValue(this.inputValue);
  }
}
