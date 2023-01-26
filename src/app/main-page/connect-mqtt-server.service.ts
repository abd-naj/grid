import { Injectable } from '@angular/core';
import {IMqttMessage, IMqttServiceOptions, IPublishOptions, MqttService} from "ngx-mqtt";
import {IClientSubscribeOptions} from "mqtt";
import {Observable, Subscription} from "rxjs";
import {GeneralService} from "../shared/general.service";

@Injectable({
  providedIn: 'root'
})
export class ConnectMqttServerService {
  connection = {
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
  subscription = {
    topic: 'com.mit2.patientMonitor',
    qos: 0,
  };
  publish = {
    topic: 'com.mit2.patientMonitor',
    qos: 0,
    payload: '{ "msg": "Hello, I am browser." }',
  };
  receiveNews = '';
  qosList = [
    { label: 0, value: 0 },
    { label: 1, value: 1 },
    { label: 2, value: 2 },
  ];
  client: MqttService | undefined;
  isConnection = false;
  subscribeSuccess = false;
  private curSubscription: Subscription | undefined;
  private mm: any[] = [];
  constructor(private _mqttService: MqttService,
              private generalService: GeneralService) {
    this.client = this._mqttService;
  }
  createConnection(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.client?.connect(this.connection as IMqttServiceOptions)
      } catch (error) {
        console.log('mqtt.connect error', error);
        reject(error)
      }
      this.client?.onConnect.subscribe(() => {
        this.isConnection = true
        console.log('Connection succeeded!');
        resolve({isConnection: true});
      });
      this.client?.onError.subscribe((error: any) => {
        this.isConnection = false
        console.log('Connection failed', error);
        reject(error)
      });
      this.client?.onMessage.subscribe((packet: any) => {
        this.receiveNews = this.receiveNews.concat(packet.payload.toString())
        resolve({receiveNews: this.receiveNews.concat(packet.payload.toString())})
        // console.log(`Received message ${packet.payload.toString()} from topic ${packet.topic}`)
      })
    })
  }

  doSubscribe(): Observable<any> {
    return new Observable<any>(observer => {
      const { topic, qos } = this.subscription
      this.curSubscription = this.client?.observe(topic, { qos } as IClientSubscribeOptions).subscribe((message: IMqttMessage) => {
        this.subscribeSuccess = true
        // console.log(message.payload.toString())
        // this.mm.push(message.payload.toString())
        console.log(1)
        this.generalService.pushThread(message.payload.toString())
        observer.next(message.payload.toString())
      })
    })

  }
  // 取消订阅
  doUnSubscribe() {
    this.curSubscription?.unsubscribe()
    this.subscribeSuccess = false
  }
  // 发送消息
  doPublish() {
    const { topic, qos, payload } = this.publish
    console.log(this.publish)
    this.client?.unsafePublish(topic, payload, { qos } as IPublishOptions)
  }
  // 断开连接
  destroyConnection() {
    try {
      this.client?.disconnect(true)
      this.isConnection = false
      console.log('Successfully disconnected!')
    } catch (error: any) {
      console.log('Disconnect failed', error.toString())
    }
  }

}
