import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../database.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NzInputModule, NzIconModule, NzButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  phone : string = '';
  password : string = '';
  passwordVisible = false;
  isFormValid = false;

  constructor(private dbs : DatabaseService, private auths : AuthService, private router : Router){

  }

  checkFormValidity(){
    this.isFormValid = this.phone !== undefined &&
      this.phone.length === 11 &&(this.phone.startsWith('013') || this.phone.startsWith('015') || this.phone.startsWith('016') || this.phone.startsWith('017') || this.phone.startsWith('018') || this.phone.startsWith('019'))
      && this.password !== undefined &&
      this.password.length > 7;
  }

  async loginClick(){
    var res = await this.dbs.Fetch('auth/login', 'post', JSON.stringify({
      phone : this.phone,
      password : this.password
    }));

    if(res.ok){
      let authDetail = await res.json();
      this.auths.Login(authDetail);
      this.router.navigateByUrl('/home');
    }
  }
}
