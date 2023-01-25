import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GeneralService} from "../../shared/general.service";

@Component({
  selector: 'app-single-device',
  templateUrl: './single-device.component.html',
  styleUrls: ['./single-device.component.scss']
})
export class SingleDeviceComponent implements OnInit, OnChanges {
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
  @Input() threadMsg: any[] = [];
  @Input() threadIndex: number;
  msgs: any[] = [];
  trigger = true;
  numberOfDevicesOnScreen = 0;
  constructor(private generalService: GeneralService) {
    this.generalService.numberOfDevicesOnScreen.subscribe((value) => {
      this.numberOfDevicesOnScreen = value;
    })
  }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.generalService.threads$);
    // console.log(this.threadMsg);
    if (this.threadIndex) {
      this.generalService.threads$[this.threadIndex]?.threads?.subscribe(value => {
        // console.log(value);
        // this.threadMsg[0]= value
        this.msgs = value;
        this.trigger = !this.trigger;
      });
    }
  }

}
