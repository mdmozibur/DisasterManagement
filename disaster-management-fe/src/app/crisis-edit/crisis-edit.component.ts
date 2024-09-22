import { Component, Input, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DatabaseService } from '../database.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-crisis-edit',
  standalone: true,
  imports: [NzButtonModule, NzListModule, NzSelectModule, FormsModule, CommonModule, NzModalModule],
  templateUrl: './crisis-edit.component.html',
  styleUrl: './crisis-edit.component.scss'
})
export class CrisisEditComponent implements OnInit{
  isDataLoading = true;
  crisisData : any[] = [];

  users : any[] = [];
  isUsersLoading = true;
  isFormValid = false;
  location : string = '';
  name : string  = '';
  severity : 'low' | 'moderate' | 'critical' = 'low';
  incident : string = '';
  isAnonymousReport = false;
  isModalVisible = false;
  isIncidentReporting = false;
  @Input() ShowEditOptions = false;
  @Input() IsHeaderVisible = false;
  @Input() IsNewCrisisButtonVisible = false;
  
  constructor(private dbs : DatabaseService, private route : ActivatedRoute){
   }

  async ngOnInit(): Promise<void> {

    // in router outlet, input values are not set. so.. setting them using this hack
    this.route.data.subscribe(data => {
      this.ShowEditOptions = data['path'] === 'admin';
      this.IsHeaderVisible = data['path'] !== 'admin';
      this.IsNewCrisisButtonVisible = data['path'] === 'root'
    });
    
    var dataJson = await this.dbs.Fetch('crisis/all', 'get', null);
    this.crisisData = (await dataJson.json()).sort((x : any,y : any) => x.id - y.id);
    this.isDataLoading = false;

    dataJson = await this.dbs.Fetch('user/volunteers', 'post', null);
    this.users = await dataJson.json();
    this.isUsersLoading = false;
  }

  async crisisStatusChange(e : any){
    var res = await this.dbs.Fetch('crisis', 'put', JSON.stringify({
      id : e.id,
      column : 'status',
      value : e.status
    }));
  }

  async assignVolunteerFor(crisis : any, user: any){
    var res = await this.dbs.Fetch('crisis/assign-volunteer', 'post', JSON.stringify({
      crisis_id : crisis.id,
      user_id : user,
    }));

    // also update FE
    if(res.ok){
      crisis.user_id = user;
    }
  }

  crisisSeverityChange(e : any){
    this.dbs.Fetch('crisis', 'put', JSON.stringify({
      id : e.id,
      column : 'severity',
      value : e.severity
    }));
  }

  getUserName(id : any){
    var tmp = this.users.find(u => u.id === id);
    console.log(tmp?.name + ', for id : ' + id);
    return tmp?.name;
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
