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
  canvas: any;
  ctx: any;
  chart: Chart;
  heratRate: number;
  nibp: string;
  spo2: number;
  temp: number;
  xxx: number;
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
    // this.threadMsg
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
    // console.log(this.trigger)
    // console.log(this.threadMsg)
    if (this.threadMsg) {
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
        case 'RECP': {
          return pressureData.length > 0  ? pressureData[pressureData.length - 1]?.meanPressure : 0;
          // break;
        }
      }
    }
    // return this.threadMsg ? this.threadMsg[this.threadMsg.length - 1].temperature : 0
  }

  private createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    setTimeout(() => {
      const chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
      };
      const config: any = {
        type: 'line',
        data: {
          datasets: [
            {
              label: '',
              backgroundColor: chartColors.blue,
              borderColor: chartColors.blue,
              fill: false,
              cubicInterpolationMode: 'monotone',
              data: []
            }]
        },
        options: {
          title: {
            display: true,
            text: 'Line chart (horizontal scroll) sample'
          },
          scales: {
            x: {
              type: 'realtime',
              realtime: {
                duration: 20000,
                delay: 1000,
                onRefresh: () => {
                  this.chart.config.data.datasets.forEach((dataset: any) => {
                    dataset.data.push({
                      x: Date.now(),
                      y: this.getMsgs()
                    });
                    // console.log(dataset);
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
              }
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
            }
          },
          // responsive: true,
          maintainAspectRatio: false,
          elements: {
            point:{
              radius: 0
            }
          }
        }
      };
      this.canvas = document.getElementById(this.canvasId);
      this.canvas.style.width ='100%';
      this.canvas.style.height='100%';
      setTimeout(() => {
        this.ctx = this.canvas.getContext('2d');

        this.chart = new Chart(this.ctx, config);
      }, 500)

    }, 500)
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
}
