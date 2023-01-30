import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart} from 'chart.js';
import 'chartjs-adapter-moment';
import {GeneralService} from "../../shared/general.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  canvasId = 'canvas' + Math.random();
  wrapperId = 'wrapper' + Math.random();
  @Input() threadMsg: any;
  @Input() trigger = false;
  @Input() type: string;
  // @Input() isOffline = true;
  @Input() threadIndex: number;
  canvas: any;
  ctx: any;
  chart: Chart;
  heratRate: number;
  nibp: string;
  spo2: number;
  temp: number;
  xxx: number;
  currentTriggerValue: boolean;
  previousPreviousValueValue: boolean;
  private isOffline = true;

  @HostListener('window:resize', ['$event'])
  onResize() {
    // this.createChart();
    this.resizeChart();
  }

  constructor(private generalService: GeneralService) {
    this.generalService.numberOfDevicesOnScreen.subscribe(() => {
      this.resizeChart();
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.threadMsg);
    if (this.threadMsg) {
      sessionStorage.setItem('time' + this.threadIndex, new Date().toISOString());
      this.time_observer();
    }
    // console.log(this.threadMsg);
    /* this.currentTriggerValue = changes['trigger'].currentValue;
     this.previousPreviousValueValue = changes['trigger'].previousValue;
   if (this.currentTriggerValue === this.previousPreviousValueValue) {
     console.log('same....')
   } else {
     console.log('not....')
     this.previousPreviousValueValue = this.currentTriggerValue
   }*/

  }

  ngOnInit(): void {
    this.createChart();
    // window.addEventListener('afterprint', () => {
    //   this.chart.resize();
    // });
  }

  // randomScalingFactor() {
  //   return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  // }

  /*  onRefresh(chart) {
      chart.config.data.datasets.forEach(function(dataset) {
        dataset.data.push({
          x: Date.now(),
          y: randomScalingFactor()
        });
      });
    }*/


  private getMsgs() {
    if (this.isOffline) {
      return
    }
    // console.log(this.threadMsg)
    // console.log('1')
    switch (this.type) {
      case 'ECG': {
        return this.threadMsg ? this.threadMsg.heartRate : 0;
        // break;
      }
      case 'SPO2': {
        return this.threadMsg ? this.threadMsg.spO2 : 0;
        // break;
      }
      case 'RESP': {
        return this.threadMsg ? this.threadMsg.value : 0;
        // break;
      }
    }

    /*if (this.threadMsg) {
      const ecgData = this.threadMsg.threads1.filter((x: any)=> x.type === 'ECG');
      const pulseData = this.threadMsg.threads1.filter((x: any) => x.type === 'pulse');
      const pressureData = this.threadMsg.threads1.filter((x: any)=> x.type === 'pressure');
      const thermometerData = this.threadMsg.threads1.filter((x: any)=> x.type === 'thermometer');
      this.heratRate = pulseData[pulseData.length - 1]?.pulseRate;
      this.nibp = pressureData[pulseData.length - 1]?.highPressure + '/' + pressureData[pulseData.length - 1]?.lowPressure;
      this.spo2 = pulseData[pulseData.length - 1]?.spO2;
      this.temp = thermometerData[pulseData.length - 1]?.temperature;
      this.xxx = pressureData[pulseData.length - 1]?.meanPressure;
      // console.log(this.heratRate)
      switch (this.type) {
        case 'ECG': {
          return ecgData.length > 0 ? ecgData[ecgData.length - 1]?.heartRate : 0;
          // break;
        }
        case 'SPO2': {
          return pulseData.length > 0  ? pulseData[pulseData.length - 1]?.spO2 : 0;
          // break;
        }
        case 'RESP': {
          return pressureData.length > 0  ? pressureData[pressureData.length - 1]?.meanPressure : 0;
          // break;
        }
      }
    }*/
    // return this.threadMsg ? this.threadMsg[this.threadMsg.length - 1].temperature : 0
  }

  private createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    let color = '';
    let yAxisMax = 50;
    let yAxisMin = 0;
    switch (this.type) {
      case 'ECG': {
        color = 'green';
        yAxisMax = 250;
        yAxisMin = 0;
        break;
      }
      case 'SPO2': {
        color = 'red';
        yAxisMax = 0;
        yAxisMin = 100;
        break;
      }
      case 'RESP': {
        color = 'yellow';
        yAxisMax = 0;
        yAxisMin = 30;
        break;
      }
    }
    setTimeout(() => {
      /*const chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
      };*/
      const config: any = {
        type: 'line',
        data: {
          datasets: [
            {
              label: '',
              backgroundColor: color,
              borderColor: color,
              fill: false,
              cubicInterpolationMode: 'monotone',
              data: []
            }]
        },
        options: {
          title: {
            display: true,
            text: ''
          },
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                duration: 20000,
                refresh: 500,
                delay: 200,
                frameRate: 10,
                ttl: undefined,
                onRefresh: () => {
                  this.chart.config.data.datasets.forEach((dataset: any) => {
                    dataset.data.push({
                      x: Date.now(),
                      y: this.getMsgs() //this.getMsgs()
                    });
                  });
                }
              },
              ticks: {
                display: false
              },
              reverse: true
            },
            y: {
              title: {
                display: false,
                text: ''
              },
              // min: yAxisMin,
              // max: yAxisMax,
            }
          },
          responsive: false,
          tooltips: {
            mode: 'nearest',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          plugins: {
            legend: {
              display: false
            },
            // streaming: {
            //   frameRate: 5   // chart is drawn 5 times every second
            // }
          },
          // responsive: true,
          maintainAspectRatio: false,
          elements: {
            point: {
              radius: 0
            }
          }
        }
      };
      this.canvas = document.getElementById(this.canvasId);
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      setTimeout(() => {
        this.ctx = this.canvas.getContext('2d');

        this.chart = new Chart(this.ctx, config);
      }, 100)

    }, 200)
  }

  private resizeChart() {
    setTimeout(() => {
      const chartWrapper = document.getElementById(this.wrapperId);
      if (chartWrapper) {
        const elHeight = chartWrapper.clientHeight;
        const elWidth = chartWrapper.clientWidth;
        this.chart?.resize(elWidth, elHeight);
      }
    }, 200)
  }

  private time_observer() {
    const refreshIntervalId = setInterval(() => {
      const start_time = new Date(sessionStorage.getItem('time' + this.threadIndex)?.toString() || '');
      const time_now = new Date();
      const diff = time_now.getTime() - start_time.getTime(); // This will give difference in milliseconds
      if (diff >= 4000) {
        this.isOffline = true;
        this.heratRate = 0;

        clearInterval(refreshIntervalId);
      } else {
        this.isOffline = false;
      }
    }, 2000);
  }
}
