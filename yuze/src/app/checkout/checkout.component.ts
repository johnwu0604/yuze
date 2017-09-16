import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  currentQt: number;

  constructor() { }

  ngOnInit() {
  }

  //+1 to purchasing quantity
  add(){
    // document.getElementById("purchase-quantity").setAttribute('value', this.currentQt + 1 );
    // this.currentQt = this.currentQt + 1 ;
  }

  //-1 to purchasing quantity
  minus(){
    console.log(typeof document.getElementById("purchase-quantity").getAttribute("value"));
    // document.getElementById("purchase-quantity").setAttribute('value', this.currentQt - 1 );
    this.currentQt = this.currentQt - 1 ;
  }
}
