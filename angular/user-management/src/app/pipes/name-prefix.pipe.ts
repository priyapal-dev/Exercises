import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namePrefix'
})
export class NamePrefixPipe implements PipeTransform {

  transform(firstName: string, gender: string): string {
    if (gender === 'male') {
      return 'Mr. ' + firstName;
    } else if(gender==='female'){
      return 'Miss. ' + firstName;
    } else{
      return firstName;
    }
  }
}
