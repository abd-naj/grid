import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageComponent} from "./main-page.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {MaterialModule} from "../shared/material/material.module";
import {RouterModule, Routes} from "@angular/router";
import {MainPanelComponent} from "../components/main-panel/main-panel.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../shared/pips/pipes.module";
import {ComponentsModule} from "../components/components.module";

const routes: Routes = [
  {path: '',
    component: MainPanelComponent
  }
];

@NgModule({
  declarations: [
    MainPageComponent,
    NavBarComponent
  ],
  exports: [
    NavBarComponent,
    MainPageComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        MatNativeDateModule,
        ReactiveFormsModule,
        FormsModule,
        PipesModule,
        ComponentsModule
    ]
})
export class MainPageModule { }
