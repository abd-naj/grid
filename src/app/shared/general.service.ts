import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

export interface IDeviceData{
  status: number,
  temperature: number,
  deviceId: string,
  timestamp: string,
  type: 'thermometer' | 'pulse' | 'ECG',
  userId: string
}

export class DeviceData {
  status: number;
  temperature: number;
  deviceId: string;
  timestamp: string;
  type: 'thermometer' | 'pulse' | 'ECG';
  userId: string
  constructor(
    status1: number,
  temperature1: number,
  deviceId1: string,
  timestamp1: string,
  type1: 'thermometer' | 'pulse' | 'ECG',
    userId1: string,
  ) {
    this.status = status1;
    this.temperature = temperature1;
    this.deviceId = deviceId1;
    this.timestamp = timestamp1;
    this.type = type1;
    this.userId = userId1;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  numberOfDevicesOnScreen: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  threads$: Array<{ threads: BehaviorSubject<any>, devicesId: string }> = new Array<any>();
  devices$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  constructor() { }
  setNumberOfDevicesOnScreen(count: number): void {
    this.numberOfDevicesOnScreen.next(count);
  }
  pushThread(thread: any): void {
    const theadJson = JSON.parse(thread);
    const devicesIds = this.devices$.getValue();
    const deviceIndex = devicesIds.findIndex(x => x === theadJson.deviceId);
    if (deviceIndex >= 0) {
      const threadIndex = this.threads$.findIndex(x => x.devicesId === theadJson.deviceId);
      const threadMsg = this.threads$[threadIndex].threads.getValue() || [];
      console.log(threadMsg);
      threadMsg.push(theadJson);
      this.threads$[threadIndex].threads.next(threadMsg);
    } else {
      devicesIds.push(theadJson.deviceId);
      this.devices$.next(devicesIds);
      this.threads$.push({threads: new BehaviorSubject<any>([theadJson]), devicesId: theadJson.deviceId});
    }
  }
}
