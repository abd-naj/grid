import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../shared/material/material.module";
import {MainPanelComponent} from "./main-panel/main-panel.component";



@NgModule({
  declarations: [
    MainPanelComponent
  ],
  exports: [
    MainPanelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class ComponentsModule { }
