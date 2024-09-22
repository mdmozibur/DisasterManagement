import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DatabaseService } from '../database.service';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-volunteer-edit',
  standalone: true,
  imports: [NzListModule, NzButtonModule, NzModalModule, CommonModule, RouterModule],
  templateUrl: './volunteer-edit.component.html',
  styleUrl: './volunteer-edit.component.scss'
})
export class VolunteerEditComponent {

  isDataLoading = true;
  isVolunteerDetailsLoading = false;
  isVolunteersModalOpen = false;
  data : any[] = [];
  clickedItem : any = null;
  assignedVolunteersData : any[] = [];

  constructor(private dbs : DatabaseService, private auths : AuthService, private alertService : NzMessageService){

  }

  async ngOnInit(): Promise<void> {
    var res = await this.dbs.Fetch('user/volunteers', 'post', JSON.stringify({
      token : this.auths.session
    }));
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

  async verifyUser(user : any){
    
    var res = await this.dbs.Fetch('user/verify', 'put', JSON.stringify({
      user_id : user.id,
      token : this.auths.session
    }));
    if(res.ok){
      user.is_verified = true;
      this.alertService.success('User successfully verified');
    }
  }
}
