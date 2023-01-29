import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceArray'
})
export class SliceArrayPipe implements PipeTransform {

  transform(value: any, args?: any, args2 = -1): Array<any> | undefined{
    if (value && args2 < 0) {
      return value.slice(0, args);
    } else if (value && args2 >= 0) {
      return value.slice(args2, args2 + 1)
    }
  }

}
