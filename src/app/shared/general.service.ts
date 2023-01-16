import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";


export interface DeviceData {
  status: number;
  temperature: number;
  deviceId: string;
  timestamp: string;
  type: 'thermometer | pulse | ECG';
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  numberOfDevicesOnScreen: BehaviorSubject<number> = new BehaviorSubject<number>(16);
  constructor() { }
  setNumberOfDevicesOnScreen(count: number): void {
    this.numberOfDevicesOnScreen.next(count);
  }
}
