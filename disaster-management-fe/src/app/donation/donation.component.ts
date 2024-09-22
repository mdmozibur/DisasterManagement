import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DatabaseService } from '../database.service';
import { interval, Subscription } from 'rxjs';

const MinAmount = 10;
const MaxAmount = 100000;

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [NzInputModule, NzInputNumberModule, NzButtonModule, FormsModule, NzStatisticModule, NgApexchartsModule, CommonModule, NzModalModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss'
})


export class DonationComponent implements OnInit{
  
  @Input() IsDonateButtonVisible = true;
  chartFundamental : any;
  chartXAxis : any;
  chartSeries! : { data : any }[];
  amount = MinAmount;
  name : string | undefined;
  address : string | undefined;
  isFormValid = false;
  isDonating = false;
  isModalVisible = false;
  totalDonationAmount = 0;
  subscription: Subscription | undefined;
  @ViewChild(ChartComponent) chart!: ChartComponent;
  
  constructor(private dbs : DatabaseService, private message: NzMessageService){
    this.chartFundamental = {
      height: 350, 
      type: 'bar',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 80,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 30
        }
      }
    }
  }

  async ngOnInit(): Promise<void> {
    
    var result_daywise = await this.dbs.Fetch('donate/daywise', 'get', null);
    var daywise_data_json = (await result_daywise.json()).sort((a: { date: string; }, b: { date: string; }) => a.date.toLowerCase().localeCompare(b.date.toLowerCase()));
    this.chartXAxis = {
      categories : daywise_data_json.map((x: { date: any; }) => x.date)
    };
    this.chartSeries = [
      {
        data : daywise_data_json.map((x: { sum: any; }) => x.sum)
      }
    ];

    this.subscription = interval(5000).subscribe(async () => {
      await this.updateStatisticValue();
    });
    
  }

  async updateStatisticValue(){
    
    // per day donation amount

    var result_daywise = await this.dbs.Fetch('donate/daywise', 'get', null);
    var daywise_data_json = (await result_daywise.json()).sort((a: { date: string; }, b: { date: string; }) => a.date.toLowerCase().localeCompare(b.date.toLowerCase()));
    
    // only assign the value if any change is there. This will prevent rerendering the chart with initial animation every time
    var newXAxis = daywise_data_json.map((x: { date: any; }) => x.date);
    if(JSON.stringify(newXAxis) !== JSON.stringify(this.chartXAxis.categories))
      this.chartXAxis = newXAxis;

    this.chartSeries[0].data = daywise_data_json.map((x: { sum: any; }) => x.sum);
    this.chart.updateSeries(this.chartSeries, true);

    // total donation amount

    var result_alltime = await this.dbs.Fetch('donate/alltime', 'get', null);
    var alltime_data_json = await result_alltime.json();
    this.totalDonationAmount = alltime_data_json.total;
  }

  checkFormValidity(){
    this.isFormValid = this.amount >= MinAmount && 
                       this.amount < MaxAmount &&
                       this.name !== undefined && 
                       this.name.length > 3;
  }

  test(e : Event){
    console.log(e);
    console.log(this.name);
  }

  async donateSubmit(){
    this.isDonating = true;
    var result = await this.dbs.Fetch('donate', 'post', JSON.stringify({
      amount : this.amount,
      donor_name : this.name,
      donor_address : this.address
    }));

    if(result.ok){
      this.name = '';
      this.amount = MinAmount;
      this.address = '';
      await this.updateStatisticValue();
      this.isModalVisible = false;
      this.message.create('success', 'Than you for your donation!');
    }
    //console.log(result);
    this.isDonating = false;
  }
}
