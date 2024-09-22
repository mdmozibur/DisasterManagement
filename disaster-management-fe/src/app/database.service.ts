import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  hostname : string;
  
  constructor() { 
    if(isDevMode()){
      this.hostname = 'http://localhost:3000/';
    }
    else{
      this.hostname = 'https://localhost:3000/';
    }

  }

  public async Fetch(endpoint : string, method : 'get' | 'post' | 'put' = 'get', bdy : any) : Promise<Response>{
    return fetch(this.hostname + endpoint, 
      { 
        method : method,
        body : bdy,
        headers: {
          'Content-Type': 'application/json', // or 'text/plain', 'application/x-www-form-urlencoded', etc.
        },
      });
  }
}
