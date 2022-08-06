import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartOptions, ScriptableLineSegmentContext, TooltipItem} from "chart.js";
import {WorkloadRecordDto} from "../model/workload-record.dto";
import {ActivatedRoute} from "@angular/router";
import 'chartjs-adapter-moment';
import {StudioDto} from "../model/studio.dto";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

  studio: StudioDto = {name: 'undefined', workloadRecords: [], id: 0}

  colorStore = new Map<string, string>([
    ['Monday', 'rgba(51,194,46,0.2)'],
    ['Tuesday', 'rgba(131,46,143,0.2)'],
    ['Wednesday', 'rgba(197,52,101,0.2)'],
    ['Thursday', 'rgba(168,127,58,0.2)'],
    ['Friday', 'rgba(42,88,140,0.2)'],
    ['Saturday', 'rgba(66,199,183,0.2)'],
    ['Sunday', 'rgba(88,56,155,0.2)'],
  ])

  lineChartData: ChartConfiguration<'line'>['data'] | undefined
  lineChartOptions: ChartOptions<'line'> | undefined


  constructor(private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      if (response.studio) {
        this.studio = response.studio
      }
    })
    this.initChart()
  }

  initChart() {
    this.lineChartOptions = this.getChartOptions()
    this.lineChartData = this.getChartData()
  }

  getChartData(): ChartConfiguration<'line'>['data'] {
    return {
      datasets: [
        {
          data: this.extractData(this.studio.workloadRecords),
          label: 'Percentage',
          fill: true,
          tension: 0.5,
          // borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
          segment: {
            borderColor: (ctx: ScriptableLineSegmentContext) => this.colorize(ctx),
            backgroundColor: (ctx: ScriptableLineSegmentContext) => this.colorize(ctx),
          }
        }
      ],
    }
  }

  getChartOptions(): ChartOptions<'line'> {
    return {
      plugins: {
        title: {
          text: this.studio?.name,
          display: true
        }, tooltip: {
          callbacks: {
            footer: (tooltipItems: TooltipItem<'line'>[]): string | string[] => this.createFooter(tooltipItems)
          }
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
          },
        },
        xAxis: {
          type: "time",
          time: {
            tooltipFormat: 'DD/MM/YYYY HH:mm',
            displayFormats: {
              'day': 'HH:mm',
            },
          }, title: {
            display: true,
            text: "Date"
          },
        }
      }
    };
  }

  colorize(ctx: ScriptableLineSegmentContext) {
    const index = ctx.p0DataIndex
    return this.getColorForTimestamp(this.studio.workloadRecords[index].timestamp)
  }

  extractData(workloadRecords: WorkloadRecordDto[]) {
    let list: { x: number, y: number }[] = []
    for (const workload of workloadRecords) {
      const dateMillis = workload.timestamp * 1000
      list.push({x: dateMillis, y: workload.percentage})
    }
    return list
  }

  getColorForTimestamp(timestamp: number) {
    const dayOfWeekName = this.timestampToWeekday(timestamp)
    return this.colorStore.get(dayOfWeekName)
  }

  timestampToWeekday(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleDateString(
      'en-US', {weekday: 'long'}
    );
  }

  createFooter(tooltipItems: TooltipItem<'line'>[]): string | string[] {
    const timestamp = this.studio.workloadRecords[tooltipItems[0].dataIndex].timestamp
    return this.timestampToWeekday(timestamp)
  }

  getColorStoreOrdered() {
    let list : {day: string, color: string}[] = []
    for (const colorStoreElement of this.colorStore.entries()) {
      list.push({day: colorStoreElement[0], color: colorStoreElement[1]})
    }
    return list
  }

}
