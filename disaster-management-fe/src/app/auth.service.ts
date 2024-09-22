import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public name = '';
  public userId = -1;
  public isAdmin = false;
  public session = '';

  constructor() { 
    var item = sessionStorage.getItem('user');
    if(item){
      var jsonItem = JSON.parse(item);
      if(jsonItem)
        this.Login(jsonItem);
    }
  }

  public Login(authDetails : any){
    this.userId = authDetails.id;
    this.isAdmin = authDetails.is_admin;
    this.name = authDetails.name;
    this.session = authDetails.session;
    sessionStorage.removeItem("user");
    sessionStorage.setItem("user", JSON.stringify(authDetails));
  }

  public Logout(){
    this.name = '';
    this.userId = -1;
    this.isAdmin = false;
    this.session = '';
    sessionStorage.removeItem("user");
  }
}
