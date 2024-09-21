import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzListModule } from 'ng-zorro-antd/list';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [NzListModule],
  templateUrl: './volunteer.component.html',
  styleUrl: './volunteer.component.scss'
})
export class VolunteerComponent implements OnInit{

  isDataLoading = true;
  data : any[] = [];

  constructor(private dbs : DatabaseService){

  }

  async ngOnInit(): Promise<void> {
    var res = await this.dbs.Fetch('auth/volunteers', 'get', null);
    this.data = await res.json();
    console.log(this.data);
    this.isDataLoading = false;
  }

}
