import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeviceData, GeneralService, IDeviceData} from "../shared/general.service";
import {ConnectStreamService} from "./connect-stream.service";
import {Tile} from "../components/main-panel/main-panel.component";
import {ConnectMqttServerService} from "./connect-mqtt-server.service";



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  tilesItemsCtrl: FormControl<Tile[] | null> = new FormControl<Tile[]>([]);
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
  private numberOfDevicesOnScreen: number;
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
    private connectMqttServerService: ConnectMqttServerService,
    private mailboxService:ConnectStreamService) {
    // this.settings = this.appSettings.settings;
    this.generalService.devices$.subscribe((value: any[]) => {
      // console.log(value);
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
    this.connectMqttServerService.createConnection().then((value) => {
      // console.log(value);
      this.connectMqttServerService.doSubscribe().subscribe(value1 => {
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
      // console.log(value)
      this.tilesItems = value;
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

  public getMails(){
    this.deviceData = this.mailboxService.getAllMails();
  /*  switch (this.type) {
      case 'all':
        this.mails = this.mailboxService.getAllMails();
        break;
      case 'starred':
        this.mails =  this.mailboxService.getStarredMails();
        break;
      case 'sent':
        this.mails =  this.mailboxService.getSentMails();
        break;
      case 'drafts':
        this.mails =  this.mailboxService.getDraftMails();
        break;
      case 'trash':
        this.mails =  this.mailboxService.getTrashMails();
        break;
      default:
        this.mails =  this.mailboxService.getDraftMails();
    }*/
  }

  public viewDetail(mail: IDeviceData){
    // this.mail = this.mailboxService.getMail(mail.id);
    // this.mails.forEach(m => m.selected = false);
    // this.mail.selected = true;
    // this.mail.unread = false;
    // this.newMail = false;
    if(window.innerWidth <= 992){
      this.sidenav.close();
    }
  }

  public compose(){
    // this.mail = null;
    this.newMail = true;
  }

  public setAsRead(){
    // this.mail.unread = false;
  }

  public setAsUnRead(){
    // this.mail.unread = true;
  }

  public delete() {
    // this.mail.trash = true;
    // this.mail.sent = false;
    // this.mail.draft = false;
    // this.mail.starred = false;
    this.getMails();
    // this.mail = null;
  }

  public changeStarStatus() {
    // this.mail.starred = !this.mail.starred;
    this.getMails();
  }

  public restore(){
    // this.mail.trash = false;
    this.type = 'all';
    this.getMails();
    // this.mail = null;
  }

  setNumberOfDevicesOnScreen(count: number) {
    this.generalService.setNumberOfDevicesOnScreen(count);
  }
}
