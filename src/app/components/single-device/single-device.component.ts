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
  rowHeight: string;
  private timer2: any;
  timeout = 0;
  progressBarValue: number;
  isOffline = false;
  deviceId: string;
  patientId: string;
  constructor(private generalService: GeneralService) {
    this.generalService.numberOfDevicesOnScreen.subscribe((value) => {
      this.numberOfDevicesOnScreen = value;
      switch (value) {
        case 1: {
          this.rowHeight = '6.57%';
          break
        }
        case 4: {
          this.rowHeight = '6.48%';
          break
        }
        case 8: {
          this.rowHeight = '6.48%';
          break
        }
        case 16:  {
          this.rowHeight = '6.3%'
        }
      }
    })
  }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.generalService.threads$);
    // console.log(this.threadMsg);
    // console.log(this.threadIndex)
    if (this.threadIndex >= 0) {
      sessionStorage.setItem('time'+ this.threadIndex, new Date().toISOString());
      this.time_observer();
      this.generalService.threads$[this.threadIndex]?.threads?.subscribe(value => {
        this.deviceId = this.generalService.threads$[this.threadIndex]?.devicesId;
        this.patientId = this.generalService.threads$[this.threadIndex]?.patientId;
        // console.log(value);
        // this.threadMsg[0]= value
        // this.updateTimer('reset')
        this.time_observer();
        sessionStorage.setItem('time'+ this.threadIndex, new Date().toISOString());
        this.msgs = value;
        this.trigger = !this.trigger;
      });
    }
  }


  private time_observer() {
    const refreshIntervalId = setInterval(() => {
      const start_time = new Date(sessionStorage.getItem('time'+ this.threadIndex)?.toString() || '');
      const time_now = new Date();
      const diff = time_now.getTime() - start_time.getTime(); // This will give difference in milliseconds
      // const sessionTime = Math.round(diff / 60000);
      // console.log(diff/1000);
      // console.log(diff);
      if (diff >= 2000) {
        // this.updateTimer();
        // console.log('offline.....')
        this.isOffline = true;
        clearInterval(refreshIntervalId);
      } else {
        this.isOffline = false;
      }
    }, 2000);
  }
}
