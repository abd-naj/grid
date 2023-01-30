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
  @Input() threadMsg: any //Thread1;
  @Input() threadIndex: number;
  @Input() trigChange = false;
  @Input() deviceIdInput: string;
  msgs: any[] = [];
  trigger = true;
  numberOfDevicesOnScreen = 0;
  rowHeight: string;
  isOffline = false;
  deviceId: string;
  patientId: string;
  heratRate: number;
  nibp: string;
  spo2: number;
  temp: number;
  resp: number;
  ecgData: any;
  pulseData: any;
  pressureData: any;
  thermometerData: any;
  respiratoryData: any;
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
    /*setInterval(() => {
      this.testTreadTime();
    }, 4000)*/
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.generalService.threads$);
    // console.log(this.threadMsg);
    // console.log(this.threadIndex)
    if (this.threadIndex >= 0) {
      // console.log(this.threadMsg);
      this.filterData();
      // sessionStorage.setItem('time'+ this.threadIndex, new Date().toISOString());
      // this.time_observer();
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
      if (diff >= 4000) {
        // this.updateTimer();
        // console.log('offline.....')
        this.isOffline = true;
        this.heratRate = 0;
        this.nibp = '';
        this.spo2 = 0;
        this.temp = 0;
        this.resp = 0;
        clearInterval(refreshIntervalId);
        this.generalService.updateSelectedThreadStatus(this.threadMsg, 'unActive')
      } else {
        this.isOffline = false;
        this.generalService.updateSelectedThreadStatus(this.threadMsg, 'isActive')
        // this.deviceId = '';
        // this.patientId = '';
      }
    }, 2000);
  }

  private filterData() {
    // console.log(this.trigger)
    // console.log(this.threadMsg)
    if (this.threadMsg?.threads) {
      this.ecgData = this.threadMsg.threads.ECG;
      this.pulseData = this.threadMsg.threads.pulse;
      this.pressureData = this.threadMsg.threads.pressure;
      this.thermometerData = this.threadMsg.threads.thermometer;
      this.respiratoryData = this.threadMsg.threads.respiratory;
      this.heratRate = this.ecgData?  this.ecgData.heartRate : 0;
      this.nibp = this.pressureData ?( this.pressureData.highPressure  + '/' + this.pressureData.lowPressure) : '';
      this.spo2 = this.pulseData ? this.pulseData.spO2 : 0;
      this.temp = this.thermometerData ? this.thermometerData?.temperature : 0;
      this.resp = this.pressureData ? this.respiratoryData.value : 0;
      this.trigger = !this.trigger;
      this.deviceId = this.threadMsg.devicesId;
      this.patientId = this.threadMsg.patientId;
      // console.log(this.heratRate)
      /*switch (this.type) {
        case 'ECG': {
          return ecgData? ecgData.slice(-1)[0].heartRate : 0;
          // break;
        }
        case 'SPO2': {
          return pulseData ? pulseData.slice(-1)[0].spO2 : 0;
          // break;
        }
        case 'RESP': {
          return pressureData ? pressureData.slice(-1)[0].meanPressure : 0;
          // break;
        }
      }*/
    } else {
      this.heratRate = 0;
      this.nibp = '';
      this.spo2 = 0;
      this.temp = 0;
      this.resp = 0;
    }
  }

  private testTreadTime() {
    // console.log(this.threadMsg)
    if (this.threadMsg) {
      if ((new Date().getTime() - new Date(this.threadMsg?.threads.timestamp).getTime() > 4000)) {
        this.isOffline = true;
        this.heratRate = 0;
        this.nibp = '';
        this.spo2 = 0;
        this.temp = 0;
        this.resp = 0;
      } else {
        this.isOffline = false;
      }
    } else {
      this.isOffline = true;
      this.heratRate = 0;
      this.nibp = '';
      this.spo2 = 0;
      this.temp = 0;
      this.resp = 0;
    }

  }
}
