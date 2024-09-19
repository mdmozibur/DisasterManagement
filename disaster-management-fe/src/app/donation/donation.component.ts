import { Component, OnInit } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartOptions } from '../home/home.component';
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
  
  amount = MinAmount;
  name : string | undefined;
  address : string | undefined;
  isFormValid = false;
  isDonating = false;
  public chartOptions: Partial<ChartOptions>;
  isModalVisible = false;
  totalDonationAmount = 0;
  subscription: Subscription | undefined;

  constructor(private dbs : DatabaseService, private message: NzMessageService){
    this.chartOptions = {
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Donations per day"
      },
    };
  }

  async ngOnInit(): Promise<void> {
    this.updateStatisticValue();
    this.subscription = interval(5000).subscribe(async () => {
      await this.updateStatisticValue();
    });
    
  }

  async updateStatisticValue(){
    
    // per day donation amount

    var result_daywise = await this.dbs.Fetch('donate/daywise', 'get', null);
    var daywise_data_json = (await result_daywise.json()).sort((a: { date: string; }, b: { date: string; }) => a.date.toLowerCase().localeCompare(b.date.toLowerCase()));
    this.chartOptions.xaxis = {
      categories : daywise_data_json.map((x: { date: any; }) => x.date)
    };
    this.chartOptions.series = [
      {
        name : 'amount',
        data : daywise_data_json.map((x: { sum: any; }) => x.sum)
      }
    ];

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
