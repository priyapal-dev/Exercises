import { Component } from '@angular/core';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.css'],
})
export class Child2Component {
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
