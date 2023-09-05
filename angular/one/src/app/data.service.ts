import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private inputValue = new BehaviorSubject<string>('');
  inputValueSubject$ = this.inputValue.asObservable();
  setInputValue(value: string): void{
    this.inputValue.next(value);
  }
  getInputValue(): string{
    return this.inputValue.value;
  }
}
