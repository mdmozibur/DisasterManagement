import { Component, OnInit } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-crisis',
  standalone: true,
  imports: [NzInputModule, NzInputNumberModule, NzButtonModule, FormsModule, NzSelectModule, NzCheckboxModule, NzModalModule, NzListModule],
  templateUrl: './crisis.component.html',
  styleUrl: './crisis.component.scss'
})
export class CrisisComponent implements OnInit{

  isFormValid = false;
  location : string = '';
  name : string  = '';
  severity : 'low' | 'moderate' | 'critical' = 'low';
  incident : string = '';
  isAnonymousReport = false;
  isModalVisible = false;
  isIncidentReporting = false;

  data : any[] = [];
  isDataLoading = true;

  constructor(private dbs : DatabaseService){

  }

  async ngOnInit(): Promise<void> {
    var dataJson = await this.dbs.Fetch('crisis', 'get', null);
    this.data = await dataJson.json();
    this.isDataLoading = false;
  }

  checkFormValidity(){
    this.isFormValid = this.location !== undefined &&
                       this.location.length > 4 &&
                       this.incident !== undefined &&
                       this.incident.length > 10;
  }

  async onSubmit(){
    this.isIncidentReporting = true;
    var result = await this.dbs.Fetch('crisis', 'post', JSON.stringify({
      location : this.location,
      severity : this.severity,
      incident : this.incident
    }));

    if(result.ok){
      this.name = '';
      this.severity = 'low';
      this.incident = '';
      await this.ngOnInit();
    }
    console.log(result);
    this.isIncidentReporting = false;
  }
}
