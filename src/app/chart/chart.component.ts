import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartOptions} from "chart.js";
import {WorkloadRecord} from "../model/workloadRecord";
import {ActivatedRoute} from "@angular/router";
import 'chartjs-adapter-moment';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

  studioInfo = 'Fitx - Fürth Hardhöhe'


  colorStore = new Map<string, string>([
    ['Monday','rgba(51,194,46,0.2)'],
    ['Tuesday','rgba(131,46,143,0.2)'],
    ['Wednesday','rgba(197,52,101,0.2)'],
    ['Thursday','rgba(168,127,58,0.2)'],
    ['Friday','rgba(42,88,140,0.2)'],
    ['Saturday','rgba(66,199,183,0.2)'],
    ['Sunday','rgba(88,56,155,0.2)'],
  ])

  colorStoreKeys = this.colorStore.keys()


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
      datasets: [
        {
          data: this.extractData(),
          label: 'Percentage',
          fill: true,
          tension: 0.5,
          // borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
          segment: {
            borderColor: (ctx: any) => this.colorize(ctx),
            backgroundColor: (ctx: any) => this.colorize(ctx),
          }
        }
      ],
    }
  }

  getChartOptions(): ChartOptions<'line'> {
    return {
      plugins: {
        title: {
          text: this.studioInfo,
          display: true
        }
      },
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
            callback: function (value: any, index: number, ticks: any) {
              return value + '%'
            }
          }, title: {
            display: true,
            text: 'Workload'
          }
        },
        xAxis: {
          type: "time",
          time: {
            tooltipFormat: 'MM/DD/YYYY'
          }, title: {
            display: true,
            text: "Date"
          }
        }
      }
    };
  }

  colorize(ctx: any) {
    const index = ctx.p0DataIndex
    return this.getColorForTimestamp(this.data[index].timestamp)
  }

  extractData() {
    let list: { x: number, y: number }[] = []
    for (const workload of this.data) {
      const dateMillis = workload.timestamp * 1000
      list.push({x: dateMillis, y: workload.percentage})
    }
    return list
  }

  // the canvas chart get initialized twice once with undefined data, so as an ugly workaround, this works
  removeCanvasIfNecessary() {
    let chartElements = document.getElementsByClassName("chart")
    if (chartElements.length > 1) {
      for (let i = 0; i < chartElements.length - 1; i++) {
        chartElements[i].remove()
      }
    }
  }

  isNewDay(timestampOne: number, timestampTwo: number) {
    const one = new Date(timestampOne * 1000)
    const two = new Date(timestampTwo * 1000)

    return one.getDay() !== two.getDay();
  }

  getColorForTimestamp(timestamp: number) {
    const dayOfWeekName = new Date(timestamp * 1000).toLocaleDateString(
      'en-US', {weekday: 'long'}
    );
    return this.colorStore.get(dayOfWeekName)
  }


}
