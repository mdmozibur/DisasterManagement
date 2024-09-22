import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [NzButtonModule, NzModalModule, NzInputNumberModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit{

  inventoryData : any[] = [];
  purchaseClickedForItem : any;
  isPurchaseModalOpen = false;
  purchaseQty = 1;
  isPurchaseOngoing = false;
  isBalanceUpdated = false;
  balance = 0;

  constructor(private dbs : DatabaseService, private alertService : NzMessageService, private auths: AuthService){}

  async ngOnInit(): Promise<void> {
    var tkn = JSON.stringify({
      token : this.auths.session
    });
    var res = await this.dbs.Fetch('inventory', 'post', tkn);
    this.inventoryData = (await res.json()).sort((x : any,y: any) => x.id - y.id);

    res = await this.dbs.Fetch('inventory/balance', 'post', tkn);
    var data = await res.json()
    this.balance = Number(data.balance);
    this.isBalanceUpdated = true;
  }

  handlePurchaseButtonClick(item : any){
    this.purchaseClickedForItem = item;
    this.isPurchaseModalOpen = true;
  }

  async confirmnPurchase(){
    this.isPurchaseOngoing = true;

    var res = await this.dbs.Fetch('inventory/purchase', 'post', JSON.stringify({
      product : this.purchaseClickedForItem.id,
      qty : this.purchaseQty,
      token : this.auths.session
    }));
    this.isPurchaseOngoing = false;
    
    if(res.ok){
      this.purchaseClickedForItem.available_qantity = this.purchaseClickedForItem.available_qantity + this.purchaseQty;
      this.isPurchaseModalOpen = false;
      this.alertService.success(this.purchaseQty + ' qunatity of item ' + this.purchaseClickedForItem.product_name + ' was purchased');
      this.purchaseQty = 1;
      this.purchaseClickedForItem = null;
    }
  }
}
