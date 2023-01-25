import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeviceData, GeneralService, Thread} from "../shared/general.service";
import {ConnectStreamService} from "./connect-stream.service";
import {Tile} from "../components/main-panel/main-panel.component";
import {ConnectMqttServerService} from "./connect-mqtt-server.service";



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  tilesItemsCtrl: FormControl<Thread[] | null> = new FormControl<Thread[]>([]);
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

  constructor(
    // public appSettings:AppSettings,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public generalService: GeneralService,
    private connectMqttServerService: ConnectMqttServerService
  ) {
    // this.settings = this.appSettings.settings;
    this.generalService.devices$.subscribe((value: any[]) => {
      console.log(value);
      console.log(this.tilesItemsCtrl.value?.length);
      console.log(this.generalService.numberOfDevicesOnScreen.getValue());
      if (value.length <= this.generalService.numberOfDevicesOnScreen.getValue() &&
        (this.tilesItemsCtrl.value?.length || 0) < this.generalService.numberOfDevicesOnScreen.getValue()) {
        this.tilesItemsCtrl.setValue(this.generalService.threads$)
      }
      this.deviceData = value;
      // console.log(this.deviceData);
      value.forEach((item, index) => {
        this.generalService.threads$[index]?.threads?.subscribe(value => {
          // console.log(value);
          if (!this.msgs[index]) {this.msgs[index] = []}
          this.msgs[index] = value
        });
      })
    });
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
      console.log(value)
      // this.tilesItems = value;
      // if (value.length <= this.numberOfDevicesOnScreen) {
      //   this.tilesItems = value;
      // }
    })
    if(window.innerWidth <= 992){
      // this.sidenavOpen = false;
    }
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    // (window.innerWidth <= 992) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  public viewDetail(thread: Thread, index: number ){
    thread.index = index;
  }



  setNumberOfDevicesOnScreen(count: number) {
    this.generalService.setNumberOfDevicesOnScreen(count);
  }
}
