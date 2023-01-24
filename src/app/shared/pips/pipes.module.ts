import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeviceFilterPipe} from "./device-filter.pipe";



@NgModule({
  declarations: [DeviceFilterPipe],
  exports: [DeviceFilterPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
