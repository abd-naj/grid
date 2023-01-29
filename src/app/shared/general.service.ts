import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
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
export class Thread1 {
  threads:IThread[];
  devicesId: string;
  patientId: string;
  index: number;
  isActive = true;
  isSelected = false;
  constructor() {
    this.threads = new Array<IThread>();
  }
}

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  numberOfDevicesOnScreen: BehaviorSubject<number> = new BehaviorSubject<number>(8);
  threads$: BehaviorSubject<Thread1[]> = new BehaviorSubject(new Array<Thread1>());
  devices$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  constructor() { }
  setNumberOfDevicesOnScreen(count: number): void {
    this.numberOfDevicesOnScreen.next(count);
  }
  testActivated: Subject<any> = new BehaviorSubject<any>(null);

   public updateSelectedThreadStatus(thread: any, type: string): void {
     // console.log(thread);
     if (thread) {
       const threads = this.threads$.getValue();
       threads[thread.index].isActive = type !== 'unActive';
     }
   }
   public updateActivatedThreadsStatus(): void {
       const threads = this.threads$.getValue();
       // threads[thread.index].isActive = false;
   }
  public deleteThread(thread: any): void {
    // console.log(thread);
    if (thread) {
      const threads = this.threads$.getValue();
      threads.splice(thread.index, 1);
    }
  }
  pushThread(thread: any): void {
    const theadJson = JSON.parse(thread);
    const devicesIds = this.devices$.getValue();
    const deviceIndex = devicesIds.findIndex(x => x.deviceId === theadJson.deviceId);
    if (deviceIndex >= 0) {
      const threadMsgs = this.threads$.getValue() || [];
      theadJson.isActive = true;
      threadMsgs[deviceIndex].threads = theadJson;
      this.threads$.next(threadMsgs);
    } else {
      devicesIds.push(theadJson);
      const threadMsgs = this.threads$.getValue() || [];
      threadMsgs.push({
        threads: [theadJson],
        devicesId: theadJson.deviceId,
        index: this.threads$.getValue().length,
        patientId: theadJson.userId,
        isActive: true,
        isSelected: false
      })
      this.threads$.next(threadMsgs);
      this.devices$.next(devicesIds);
    }
  }
}
