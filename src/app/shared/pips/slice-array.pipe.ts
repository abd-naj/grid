import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceArray'
})
export class SliceArrayPipe implements PipeTransform {

  transform(value: any, args?: any): Array<any> | undefined{
    if (value) {
      return value.slice(0, args);
    }
  }

}
