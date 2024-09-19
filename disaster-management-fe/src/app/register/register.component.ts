import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NzInputModule, NzIconModule, NzButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email : string = '';
  password : string = '';
  password2 : string = '';
  passwordVisible = false;
  password2Visible = false;
  isFormValid = false;

  constructor(private dbs: DatabaseService){

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
      this.password.length > 7 &&
      this.password2 === this.password;
  }

  async registerClick(){
    var res = await this.dbs.Fetch('auth/register', 'post', JSON.stringify({
      email : this.email,
      password : this.password
    }));
    console.log(res);
  }
}
