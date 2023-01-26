import { Component, HostListener, OnInit } from '@angular/core';
import {GeneralService} from "../../shared/general.service";
import {map, Observable, of, take} from "rxjs";
export class Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
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

  constructor(private generalService: GeneralService) {
    this.generalService.numberOfDevicesOnScreen.subscribe((value: number) => {
      this.numberOfDevicesOnScreen = value;
      // console.log(value)
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

  ngOnInit(): void {
   /* this.tiles.pipe(
      map(x => {
        console.log(x)
        return x.slice(0, this.generalService.numberOfDevicesOnScreen.getValue())
      }))*/
  }
  setNumberOfDevicesOnScreen(count: number) {
    this.generalService.setNumberOfDevicesOnScreen(count);
  }

}
