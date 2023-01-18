import { Injectable } from '@angular/core';
import {DeviceData, IDeviceData} from "../shared/general.service";


let Data = [
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-1'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-2'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-3'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-4'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-5'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-6'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-7'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-8'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-9'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-10'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-11'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-12'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-13'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-14'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-15'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-16'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-17'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-18'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-19'),
  new DeviceData(1, 0.0,'2b2cf1912e9e1c05', '2023-01-11T21:06:00.067132Z', 'thermometer', '6d4e7d50-e5b3-20'),
];


@Injectable({
  providedIn: 'root'
})
export class ConnectStreamService {


  public getAllMails() {
    // return Data.filter(mail => mail.sent == false && mail.draft == false && mail.trash == false);
    return Data;
  }

  // public getStarredMails() {
  //   return Data.filter(mail => mail.starred == true);
  // }
  //
  // public getSentMails() {
  //   return Data.filter(mail => mail.sent == true);
  // }
  //
  // public getDraftMails() {
  //   return Data.filter(mail => mail.draft == true);
  // }
  //
  // public getTrashMails() {
  //   return Data.filter(mail => mail.trash == true);
  // }
  //
  // public getMail(id: number | string) {
  //   return Data.find(mail => mail.id === +id);
  // }
}
