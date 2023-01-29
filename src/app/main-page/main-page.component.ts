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
  selectedPatientDevice: number;
  private manualChaneSelectPatient: boolean;

  constructor(
    // public appSettings:AppSettings,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public generalService: GeneralService,
    private connectMqttServerService: ConnectMqttServerService
  ) {
    sessionStorage.setItem('update-status-time', new Date().toISOString());
    // this.time_observer();
    this.threads$ = this.generalService.threads$.pipe(map((value) => {
      // console.log(value)
      // add new connected device auto
      const selected = this.tilesItemsCtrl.value;
      value.forEach((item: any) => {
        const deviceIndex = selected?.find(x => x.devicesId === item.devicesId) ;
        if (((this.tilesItemsCtrl.value?.length || 0) < 8) && !deviceIndex && !item.isSelected && !this.manualChaneSelectPatient) {
          item.isSelected = true;
          selected?.push(item);
        }
        /*if ((new Date().getTime() - new Date(item.threads.timestamp).getTime() > 10000) && !item.isSelected) {
          selected?.splice(deviceIndex, 1);
        }*/
      })
      /////
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



  setNumberOfDevicesOnScreen(count: number, index = -1) {
    this.generalService.setNumberOfDevicesOnScreen(count);
    this.selectedPatientDevice = index;
  }

  arrayOFNumber(): Array<number>{
    let diff = 0;
    if (this.numberOfDevicesOnScreen - (this.tilesItemsCtrl.value?.length || 0) > 0) {
      diff = this.numberOfDevicesOnScreen - (this.tilesItemsCtrl.value?.length || 0)
    }
    return Array(diff).fill(0).map((x,i)=>i);
  }

  changeSelectedPatient(event: any) {
    // console.log(event);
    this.manualChaneSelectPatient = true;
    if (event.options[0].selected) {return}
    const value = event.options[0].value;
    if (!value.isActive) {
      this.generalService.deleteThread(value);
    }
  }
  private time_observer() {
    const refreshIntervalId = setInterval(() => {
      const start_time = new Date(sessionStorage.getItem('update-status-time')?.toString() || '');
      const time_now = new Date();
      const diff = time_now.getTime() - start_time.getTime(); // This will give difference in milliseconds
      if (diff >= 4000) {
        clearInterval(refreshIntervalId);
        this.generalService.updateActivatedThreadsStatus()
      } else {
      }
    }, 2000);
  }

}
