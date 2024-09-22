import { Component } from '@angular/core';
import {NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { VolunteerEditComponent } from '../volunteer-edit/volunteer-edit.component';
import { CrisisEditComponent } from '../crisis-edit/crisis-edit.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NzMenuModule, CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  selectedItem : 'volunteer' | 'crisis' | 'report' = 'volunteer';
  
  constructor(private router : Router, private activatedRoute: ActivatedRoute){

    //in case of the url changes manually, need to load correct ui
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(e =>{
      if(!e.url.startsWith('/admin'))
        return;

      let curComp = this.activatedRoute.firstChild?.snapshot.component;
      
      if(e.url.endsWith('volunteer') && !(curComp instanceof VolunteerEditComponent)){
        this.selectedItem = 'volunteer';
        router.navigateByUrl('admin/volunteer');
      }
      
      else if(e.url.endsWith('crisis') && !(curComp instanceof CrisisEditComponent)){
        this.selectedItem = 'crisis';
        router.navigateByUrl('admin/crisis');
      }

    })
  }

}
