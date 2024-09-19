import { Component, OnInit } from '@angular/core';
import {NzMenuModule } from 'ng-zorro-antd/menu';
import { NzListModule } from 'ng-zorro-antd/list';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NzMenuModule, NzListModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

  selectedItem : 'volunteer' | 'crisis' | 'report' = 'volunteer';
  isDataLoading = true;
  crisisData : any[] = [];

  constructor(private dbs : DatabaseService){}

  async ngOnInit(): Promise<void> {
    var dataJson = await this.dbs.Fetch('crisis', 'get', null);
    this.crisisData = await dataJson.json();
    this.isDataLoading = false;
  }
}
