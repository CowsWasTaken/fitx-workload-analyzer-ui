import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartOptions} from "chart.js";
import {WorkloadRecord} from "../model/workloadRecord";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {


  data: WorkloadRecord[] = []

  lineChartData: ChartConfiguration<'line'>['data'] | undefined
  lineChartOptions: ChartOptions<'line'> | undefined


  constructor(private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      if (response.workloadRecords) {
        this.data = response.workloadRecords
      }
    })
    this.initChart()
    this.removeCanvasIfNecessary()
  }

  initChart() {
    this.lineChartOptions = this.getChartOptions()
    this.lineChartData = this.getChartData()
  }

  getChartData(): ChartConfiguration<'line'>['data'] {
    return {
      labels: this.extractLabels(),
      datasets: [
        {
          data: this.extractData(),
          label: 'Percentage',
          fill: true,
          tension: 0.5,
          // borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
          segment: {
            borderColor: (ctx: any) => this.colorize(ctx, 'rgb(0,0,0,0.2)'),
            backgroundColor: (ctx: any) => this.colorize(ctx, 'rgb(0,0,0,0.2)'),
          }
        }
      ],
    }
  }

  getChartOptions() : ChartOptions<'line'> {
    return {
      elements: {
        point: {
          radius: 2
        }
      },
      responsive: true,
      scales: {
        yAxis: {
          beginAtZero: true,
          ticks: {
            callback: function(value: any, index: number, ticks: any) {
              return value + '%'
            }
          }
        },
        // xAxis: {
        //   beginAtZero: true,
        //   ticks: {
        //     callback: function(value: any, index: number, ticks: any) {
        //       console.log(ticks[value])
        //       return value + '%'
        //     }
        //   }
        // }
      }
    };
  }

  colorize(ctx: any, value: any) {
    if (ctx.p0.parsed.y === 17) {
      const index = ctx.p0DataIndex
      // console.log(this.data)
      return value
    } else {

      return 'rgba(51,194,46,0.2)'
    }
  }

  extractData() {
    let list = []
    for (const workload of this.data) {
      list.push(workload.percentage)
    }
    return list
  }

  extractLabels() {
    let list = []
    for (const workload of this.data) {
      const date = new Date(workload.timestamp * 1000)
      list.push(date.getHours())
    }
    return list
  }

  // the canvas chart get initialized twice once with undefined data, so as an ugly workaround, this works
  removeCanvasIfNecessary() {
   let chartElements =  document.getElementsByClassName("chart")
    if (chartElements.length > 1) {
      for (let i = 0; i < chartElements.length-1; i++) {
        chartElements[i].remove()
      }
    }
  }


}
