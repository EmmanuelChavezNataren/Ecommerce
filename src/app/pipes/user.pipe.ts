import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'userExtract'})

export class UserExtractPipe implements PipeTransform {
 transform(value: any, arg): any {
    let newVal: any;
    if (arg === 'firstname') {
      newVal = value ? value.split(' ')[0] : '';
    } else if (arg === 'fullname') {
      newVal = value ? value.split(' ')[0] + ' ' + value.split(' ')[1]  : '';
    } else if (arg === 'lastname') {
      newVal = value ? value.split(' ')[2] + ' ' + value.split(' ')[3]  : '';
    }
    return newVal;
  }
}
