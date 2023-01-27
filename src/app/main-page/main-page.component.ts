import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeviceData, GeneralService, Thread1} from "../shared/general.service";
import {Tile} from "../components/main-panel/main-panel.component";
import {ConnectMqttServerService} from "./connect-mqtt-server.service";
import {map, Observable} from "rxjs";



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  // tilesItemsCtrl: FormControl<Thread[] | null> = new FormControl<Thread[]>([]);
  tilesItemsCtrl: FormControl<any[] | null> = new FormControl<any[]>([]);
  tilesItems: Tile[] = [];
  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  ];
  colsNumber: number;
  rowHeight: string;
  numberOfDevicesOnScreen: number;
  @ViewChild('sidenav', { static: true }) sidenav: any;
  // public settings: Settings;
  public sidenavOpen:boolean = false;
  public mail: DeviceData;
  public newMail: boolean;
  public type:string = 'all';
  public searchText: string;
  deviceData: any[];
  msgs: Array<any[]> = [];
  threads$: Observable<Thread1[]>;
  devices: any[];
  trigChange = true;
  selectedPatient: any[] = [];

  constructor(
    // public appSettings:AppSettings,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public generalService: GeneralService,
    private connectMqttServerService: ConnectMqttServerService
  ) {
    this.threads$ = this.generalService.threads$.pipe(map((value) => {
      // console.log(value)
      const selected = this.tilesItemsCtrl.value;
      const newValuesArray: Thread1[] = [];
      selected?.forEach((o, index) => {
        const newValues: Thread1[] = value.filter(x => x.devicesId === o.devicesId);
        newValuesArray[index] = newValues[0];
        if (selected?.length - 1 === index) {
          this.tilesItemsCtrl.setValue(newValuesArray);
          this.trigChange = !this.trigChange;
        }
      })

      return value
    }) );
    // this.settings = this.appSettings.settings;

    /*this.generalService.devices$.subscribe((value: any[]) => {
      // console.log(value);
      this.devices = value;
      // console.log(this.tilesItemsCtrl.value?.length);
      // console.log(this.generalService.numberOfDevicesOnScreen.getValue());
      const selectedItems = this.tilesItemsCtrl.value;
      if (value.length <= 16 && (this.tilesItemsCtrl.value?.length || 0) < 16) {
      // if (value.length <= 16) {
        const threads: any = [];
        Object.assign(threads, value);
        this.tilesItemsCtrl.setValue(threads)
      }
      this.deviceData = value;
      // console.log(this.deviceData);
      value.forEach((item, index) => {
        this.generalService.threads[index]?.threads$?.subscribe(value => {
          // console.log(value);
          this.trigChange = !this.trigChange
          if (!this.msgs[index]) {this.msgs[index] = []}
          this.msgs[index] = value
        });
      })

    });
    */

    this.connectMqttServerService.createConnection().then(() => {
      // console.log(value);
      this.connectMqttServerService.doSubscribe().subscribe(() => {
        // console.log(value1);
      });
    });
    // this.getMails();

    this.generalService.numberOfDevicesOnScreen.subscribe((value: number) => {
      this.numberOfDevicesOnScreen = value;
      switch (value) {
        case 16: {
          this.colsNumber = 4;
          this.rowHeight = '25%';
          this.tilesItems = this.tiles.slice(0, this.numberOfDevicesOnScreen)
          break;
        }
        case 8: {
          this.colsNumber = 4;
          this.rowHeight = '50%';
          this.tilesItems = this.tiles.slice(0, this.numberOfDevicesOnScreen)
          break;
        }
        case 4: {
          this.colsNumber = 2;
          this.rowHeight = '50%';
          this.tilesItems = this.tiles.slice(0, this.numberOfDevicesOnScreen)
          break;
        }
        case 1: {
          this.colsNumber = 1;
          this.rowHeight = '100%';
          this.tilesItems = this.tiles.slice(0, this.numberOfDevicesOnScreen)
          break;
        }
      }
    })
  }

  ngOnInit() {
    this.tilesItemsCtrl.valueChanges.subscribe((value: any) => {
      // this.changeSelectedPatient();
    })
    if(window.innerWidth <= 992){
      // this.sidenavOpen = false;
    }
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    // (window.innerWidth <= 992) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  public viewDetail(thread: Thread1, index: number ){
    thread.index = index;
  }



  setNumberOfDevicesOnScreen(count: number) {
    this.generalService.setNumberOfDevicesOnScreen(count);
  }

  arrayOFNumber(): Array<number>{
    let diff = 0;
    if (this.numberOfDevicesOnScreen - (this.tilesItemsCtrl.value?.length || 0) > 0) {
      diff = this.numberOfDevicesOnScreen - (this.tilesItemsCtrl.value?.length || 0)
    }
    return Array(diff).fill(0).map((x,i)=>i);
  }

  changeSelectedPatient() {
    // this.selectedPatient = this.generalService.threads$.filter(x => x.patientId === )
    /*this.selectedPatient = this.generalService.threads$.filter(function (o1) {
      return !options.some(function (o2) {
        return o1.patientId === o2.patientId; // return the ones with equal id
      });
    });*/
// if you want to be more clever...
//     const options = this.tilesItemsCtrl.value || [];
    // console.log(options);
    // this.selectedPatient = this.generalService.threads.filter(o1 => options.some((o2: any) => o1.patientId === o2.patientId));
    // console.log(this.selectedPatient);
  }

}
