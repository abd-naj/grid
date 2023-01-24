import { Pipe, PipeTransform } from '@angular/core';
import {DeviceData, IDeviceData} from "../general.service";

@Pipe({
  name: 'deviceFilter'
})
export class DeviceFilterPipe implements PipeTransform {
  // @ts-ignore
  transform(value: any, args?: any): Array<any>{
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter((mail: string) => {
        if(mail){
          if(mail.search(searchText) !== -1){
            return true;
          }
        }
      });
    }
  }
  /*transform(value: any, args?: any): Array<any>{
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter((mail: IDeviceData) => {
        if(mail.userId || mail.deviceId){
          if(mail.userId.search(searchText) !== -1 || mail.deviceId.search(searchText) !== -1){
            return true;
          }
        }
      });
    }
  }*/
}
