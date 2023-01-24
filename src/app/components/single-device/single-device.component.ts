import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-device',
  templateUrl: './single-device.component.html',
  styleUrls: ['./single-device.component.scss']
})
export class SingleDeviceComponent implements OnInit {
  tiles: any[] = [
    {text: '111', cols: 3, rows: 5, color: '#000000'},
    {text: '444', cols: 1, rows: 3, color: '#000000'},

    {text: '120/80', cols: 1, rows: 3, color: '#000000'},
    {text: '222', cols: 3, rows: 5, color: '#000000'},
    {text: '98', cols: 1, rows: 3, color: '#000000'},
    {text: '777', cols: 1, rows: 3, color: '#000000'},
    {text: '333', cols: 3, rows: 5, color: '#000000'},
    {text: '888', cols: 1, rows: 3, color: '#000000'},

    // {text: '666', cols: 1, rows: 3, color: '#DDBDF1'},
    // {text: '777', cols: 1, rows: 3, color: '#d75676'},
    // {text: '888', cols: 1, rows: 3, color: '#c2f1bd'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
