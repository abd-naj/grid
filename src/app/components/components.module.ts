import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../shared/material/material.module";
import {MainPanelComponent} from "./main-panel/main-panel.component";
import { SingleDeviceComponent } from './single-device/single-device.component';
import { ChartComponent } from './chart/chart.component';
import {Chart, LineElement, PointElement, registerables} from "chart.js";
import StreamingPlugin from "chartjs-plugin-streaming";
Chart.register(...registerables);
Chart.register(LineElement);
Chart.register(PointElement);
Chart.register(StreamingPlugin);


@NgModule({
  declarations: [
    MainPanelComponent,
    SingleDeviceComponent,
    ChartComponent
  ],
  exports: [
    MainPanelComponent,
    SingleDeviceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class ComponentsModule { }
