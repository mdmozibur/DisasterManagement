import { Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-crisis',
  standalone: true,
  imports: [NzInputModule, NzInputNumberModule, NzButtonModule, FormsModule, NzSelectModule, NzCheckboxModule],
  templateUrl: './crisis.component.html',
  styleUrl: './crisis.component.scss'
})
export class CrisisComponent {

  isFormValid = false;
  location : string | undefined;
  name : string | undefined;
  severity : 'low' | 'moderate' | 'critical' = 'low';
  status : 'reported' | 'investigating' | 'responding' | 'resolved' = 'reported';
  incident : string | undefined;
  isAnonymousReport = false;

  constructor(private dbs : DatabaseService){

  }

  checkFormValidity(){
    this.isFormValid = this.location !== undefined &&
                       this.location.length > 4 &&
                       this.incident !== undefined &&
                       this.incident.length > 10;
  }

  async onSubmit(){
    var result = await this.dbs.Fetch('crisis', 'post', JSON.stringify({
      location : this.location,
      severity : this.severity,
      incident : this.incident
    }));
    console.log(result);
  }
}
