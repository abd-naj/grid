import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ComponentsModule} from "./components/components.module";
import {MainPageModule} from "./main-page/main-page.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';

export const connection: IMqttServiceOptions = {
  hostname: '2fc728b690d148bab3931f992aefb6b5.s2.eu.hivemq.cloud',
  port: 8884,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 4000,
  path: '/mqtt',
  clientId: '12345',
  username: 'bkhashfeh',
  password: 'TGCwfmytC7SK7du',
  protocol: 'wss',
  connectOnCreate: false,
  protocolVersion: 4,
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    MainPageModule,
    MqttModule.forRoot(connection)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
