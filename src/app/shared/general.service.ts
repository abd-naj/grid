import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IThread} from "./models/devices.model";

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
  type: 'thermometer' | 'pulse' | 'ECG' | 'pressure';
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
export class Thread {
  threads$: BehaviorSubject<any>;
  threads1: any[];
  devicesId: string;
  patientId: string;
  index: number
}
export class Thread1 {
  threads:IThread[];
  devicesId: string;
  patientId: string;
  index: number;
  constructor() {
    this.threads = new Array<IThread>();
  }
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  numberOfDevicesOnScreen: BehaviorSubject<number> = new BehaviorSubject<number>(8);
  // threads: Array<Thread> = new Array<any>();
  threads$: BehaviorSubject<Thread1[]> = new BehaviorSubject(new Array<Thread1>());
  devices$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  constructor() { }
  setNumberOfDevicesOnScreen(count: number): void {
    this.numberOfDevicesOnScreen.next(count);
  }
  pushThread(thread: any): void {
    const theadJson = JSON.parse(thread);
    // console.log(thread);
    // console.log(theadJson);
    const devicesIds = this.devices$.getValue();
    const deviceIndex = devicesIds.findIndex(x => x.deviceId === theadJson.deviceId);
    if (deviceIndex >= 0) {
      // const threadIndex = this.threads.findIndex(x => x.devicesId === theadJson.deviceId);
      // const threadIndex = theadJson.deviceId;
      const threadMsgs = this.threads$.getValue() || [];
      // const threadMsgsIndex = threadMsgs.findIndex(x => x.devicesId === theadJson.deviceId);
      // console.log(deviceIndex)
      // console.log(threadMsgs)
      threadMsgs[deviceIndex].threads = theadJson;
      // const lastThreadMsg = threadMsg.slice(-6);
      // this.threads[threadIndex].threads1 = this.threads[threadIndex].threads1.slice(-6);
      // console.log(threadMsg);
      // console.log(threadIndex);
      // lastThreadMsg.push(theadJson);
      this.threads$.next(threadMsgs);
      // this.threads$[threadIndex].threads1.push(theadJson);
      // console.log(this.threads$[threadIndex]);
    } else {
      devicesIds.push(theadJson);
      const threadMsgs = this.threads$.getValue() || [];
      threadMsgs.push({threads: [theadJson], devicesId: theadJson.deviceId, index: this.threads$.getValue().length, patientId: theadJson.userId})
      this.threads$.next(threadMsgs);
      this.devices$.next(devicesIds);
    }
  }
}
