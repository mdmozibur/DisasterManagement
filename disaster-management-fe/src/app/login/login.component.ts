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
  email : string = '';
  password : string = '';
  passwordVisible = false;
  isFormValid = false;

  constructor(private dbs : DatabaseService, private auths : AuthService, private router : Router){

  }

  checkFormValidity(){
    //regex patter to check if anemail is valid from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    var regexEmailValidityCheck = String(this.email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    this.isFormValid = this.email != undefined &&
      this.email.length > 3 &&
      regexEmailValidityCheck !== undefined && regexEmailValidityCheck !== null 
      && this.password != undefined &&
      this.password.length > 7;
  }

  async loginClick(){
    var res = await this.dbs.Fetch('auth/login', 'post', JSON.stringify({
      email : this.email,
      password : this.password
    }));

    if(res.ok){
      let authDetail = await res.json();
      this.auths.Login(authDetail);
      this.router.navigateByUrl('/home');
    }
  }
}
