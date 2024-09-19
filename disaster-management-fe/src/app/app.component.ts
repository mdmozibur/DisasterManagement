import { Component, HostListener } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzButtonModule, NzMenuModule, NzLayoutModule, NzIconModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'disaster-management-fe';
  isHorizontal = false;
  currentWidth = 0;
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isHorizontal = window.innerWidth < 600;
  }

  constructor(public auths : AuthService){
    this.onResize();  
  }
}
