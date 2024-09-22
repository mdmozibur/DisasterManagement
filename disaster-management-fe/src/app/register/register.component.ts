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
  phone = '';
  password = '';
  password2 = '';
  passwordVisible = false;
  password2Visible = false;
  isRegistrationOngoing = false;

  isNameValid = false;
  isPhoneValid = false;
  isPasswordMatching = false;
  isPasswordLengthyEnough = false;
  isFormValid = false;

  constructor(private dbs: DatabaseService, private alertService : NzMessageService, private router: Router){

  }

  checkFormValidity(){
    this.isFormValid = this.isNameValid && this.isPhoneValid && this.isPasswordLengthyEnough && this.isPasswordMatching;
  }

  checkName(){
    this.isNameValid = this.name.length > 3;
    this.checkFormValidity();
  }

  checkPhone(){
    this.isPhoneValid = this.phone !== undefined && this.phone.length === 11 && 
      (this.phone.startsWith('013') || this.phone.startsWith('015') || this.phone.startsWith('016') || this.phone.startsWith('017') || this.phone.startsWith('018') || this.phone.startsWith('019'));
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
      phone : this.phone,
      password : this.password,
      name : this.name
    }));

    if(res.ok){
      this.alertService.success('Registration successful! Once an admin verifies your information, you can log in');
      await new Promise(r => setTimeout(r, 1000));
      this.router.navigateByUrl('login');
    }
    else{
      this.isRegistrationOngoing = false;
      var info = await res.json();
      if(info.errorMessage === 'email must be unique'){
        this.alertService.error('an account with phone ' + this.phone + ' already exists');
      }
    }
  }
}
