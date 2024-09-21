import { Component, Input, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { DatabaseService } from '../database.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [NzListModule, NzButtonModule, NzModalModule, CommonModule, RouterModule],
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.scss'
})
export class VolunteerComponent implements OnInit{

  
  @Input() ShowExtraButtons = true;
  isDataLoading = true;
  isVolunteerDetailsLoading = false;
  isVolunteersModalOpen = false;
  data : any[] = [];
  clickedItem : any = null;
  assignedVolunteersData : any[] = [];

  constructor(private dbs : DatabaseService){

  }

  async ngOnInit(): Promise<void> {
    var res = await this.dbs.Fetch('auth/volunteers', 'get', null);
    this.data = await res.json();
    this.isDataLoading = false;
  }

  async viewCrisises(user : any){
    this.isVolunteersModalOpen = true;
    this.isVolunteerDetailsLoading = true;
    this.clickedItem = user;

    var res = await this.dbs.Fetch('crisis/specific?ids=' + user.assigned_crisises, 'get', null);

    this.isVolunteerDetailsLoading = false;
    if(res.ok){
      this.assignedVolunteersData = await res.json();
    }
  }
}
