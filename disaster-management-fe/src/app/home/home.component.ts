import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { interval, Subscription } from 'rxjs';
import { NgApexchartsModule } from "ng-apexcharts";

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzStatisticModule, CommonModule, NgApexchartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  donationAmount = 100200;
  subscription: Subscription | undefined;
  public chartOptions: Partial<ChartOptions>;
  
  constructor(){
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };
  }

  ngOnInit() { 
    this.subscription = interval(5000).subscribe(async () => {
      await this.updateStatisticValue();
    });
  }

  updateStatisticValue(): Promise<void> {
    this.donationAmount = this.donationAmount + 5;
    return Promise.resolve();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
