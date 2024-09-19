import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../database.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NzInputModule, NzIconModule, NzButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  password2 = '';
  passwordVisible = false;
  password2Visible = false;
  isRegistrationOngoing = false;

  isNameValid = false;
  isEmailValid = false;
  isPasswordMatching = false;
  isPasswordLengthyEnough = false;
  isFormValid = false;

  constructor(private dbs: DatabaseService, private alertService : NzMessageService, private router: Router){

  }

  checkFormValidity(){
    this.isFormValid = this.isNameValid && this.isEmailValid && this.isPasswordLengthyEnough && this.isPasswordMatching;
  }

  checkName(){
    this.isNameValid = this.name.length > 3;
    this.checkFormValidity();
  }

  checkEmail(){
    //regex patter to check if anemail is valid from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    var regexEmailValidityCheck = String(this.email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    this.isEmailValid = regexEmailValidityCheck !== undefined && regexEmailValidityCheck !== null;
    this.checkFormValidity();
  }

  checkPassword(){
    this.isPasswordLengthyEnough = this.password.length > 7;
    this.isPasswordMatching = this.password === this.password2;
    this.checkFormValidity();
  }

  async registerClick(){
    this.isRegistrationOngoing = true;
    var res = await this.dbs.Fetch('auth/register', 'post', JSON.stringify({
      email : this.email,
      password : this.password,
      name : this.name
    }));

    if(res.ok){
      this.alertService.success('Registration successful! Taking you to login page...');
      await new Promise(r => setTimeout(r, 1000));
      this.router.navigateByUrl('login');
    }
    else{
      this.isRegistrationOngoing = false;
      var info = await res.json();
      if(info.errorMessage === 'email must be unique'){
        this.alertService.error('an account with email ' + this.email + ' already exists');
      }
    }
  }
}
