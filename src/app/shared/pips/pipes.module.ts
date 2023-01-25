import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeviceFilterPipe} from "./device-filter.pipe";
import { SliceArrayPipe } from './slice-array.pipe';



@NgModule({
  declarations: [DeviceFilterPipe, SliceArrayPipe],
    exports: [DeviceFilterPipe, SliceArrayPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
