import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public name = '';
  public userId = -1;
  public isAdmin = false;

  constructor() { }

  public Login(authDetails : any){
    this.userId = authDetails.id;
    this.isAdmin = authDetails.is_admin;
    this.name = authDetails.name;
  }
}
