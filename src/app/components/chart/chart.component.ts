import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  Chart,
  LineElement,
  PointElement,
  registerables
} from 'chart.js';
import StreamingPlugin from "chartjs-plugin-streaming";
import 'chartjs-adapter-moment';
Chart.register(...registerables);
Chart.register(LineElement);
Chart.register(PointElement);
Chart.register(StreamingPlugin);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() canvasId: string;
  canvas: any;
  ctx: any;
  chart: Chart;
  uId = Math.random();
  // @ViewChild('canvas')  pathwayChart!: { nativeElement: any };
  // pathwayChart
  constructor() {
    console.log(this.uId)
  }


  ngOnInit(): void {
    window.onload = () => {
      const chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
      };
      // const color = Chart.helpers.color;
      const config: any = {
        type: 'line',
        data: {
          datasets: [
            {
            label: 'Dataset 2 (cubic interpolation)',
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
                delay: 2000,
                onRefresh: () => {
                  this.chart.config.data.datasets.forEach((dataset: any) => {
                    dataset.data.push({
                      x: Date.now(),
                      y: this.randomScalingFactor()
                    });
                  });
                }
              },
              reverse: true
            },
            y: {
              title: {
                display: true,
                text: 'Value'
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
          }
        }
      };
      // this.canvas = this.pathwayChart.nativeElement;
      this.canvas = document.getElementById(this.canvasId)
      console.log(this.canvas)
      setTimeout(() => {
        this.ctx = this.canvas.getContext('2d');

        this.chart = new Chart(this.ctx, config);
      }, 1000)

    };

  }

  randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  }

/*  onRefresh(chart) {
    chart.config.data.datasets.forEach(function(dataset) {
      dataset.data.push({
        x: Date.now(),
        y: randomScalingFactor()
      });
    });
  }*/






}