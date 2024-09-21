import { Component, OnInit } from '@angular/core';
import {NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DatabaseService } from '../database.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NzMenuModule, NzListModule, CommonModule, NzButtonModule, NzSelectModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

  selectedItem : 'volunteer' | 'crisis' | 'report' = 'volunteer';
  isDataLoading = true;
  crisisData : any[] = [];

  users : any[] = [];
  isUsersLoading = true;

  constructor(private dbs : DatabaseService){}

  async ngOnInit(): Promise<void> {
    var dataJson = await this.dbs.Fetch('crisis/all', 'get', null);
    this.crisisData = await dataJson.json();
    this.isDataLoading = false;

    dataJson = await this.dbs.Fetch('auth/volunteers', 'get', null);
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
  }

  crisisSeverityChange(e : any){
    this.dbs.Fetch('crisis', 'put', JSON.stringify({
      id : e.id,
      column : 'severity',
      value : e.severity
    }));
  }
}
