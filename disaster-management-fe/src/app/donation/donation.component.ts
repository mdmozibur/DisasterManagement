import { Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

const MinAmount = 10;
const MaxAmount = 100000;

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [NzInputModule, NzInputNumberModule, NzButtonModule, FormsModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss'
})


export class DonationComponent {
  
  amount = MinAmount;
  name : string | undefined;
  address : string | undefined;
  isFormValid = false;

  checkFormValidity(){
    this.isFormValid = this.amount >= MinAmount && 
                       this.amount < MaxAmount &&
                       this.name !== undefined && 
                       this.name.length > 3;
  }

  test(e : Event){
    console.log(e);
    console.log(this.name);
  }

  donateSubmit(){

  }
}
