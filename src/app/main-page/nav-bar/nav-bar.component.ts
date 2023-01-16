import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../shared/general.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  private numberOfDevicesOnScreen: number;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  setNumberOfDevicesOnScreen(count: number) {
    this.generalService.setNumberOfDevicesOnScreen(count);
  }
}
