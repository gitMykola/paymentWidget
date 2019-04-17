import { Component, OnInit, Input } from '@angular/core';
import { Utils } from './lib/utils';
import { PaymentService } from './services/payment.service';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private paymentAmmount: number;
  private paymentCurrency: string;
  private inputValidator = new RegExp(/^\d{0,10}\.?\d{0,10}\s[a-z]{3,33}\b/i);
  @Input('ammount')
  set ammount(ammount: string) {
    // validate input data
    if (!!ammount && this.inputValidator.test(ammount)) {
      const data = ammount.split(' ');
      this.paymentAmmount = Number((Number(data[0])).toFixed(2));
      this.paymentCurrency = data[1].toUpperCase();
    } else {
      Utils.log('Ammount should be like \'5.27 USD\'');
    }
  }
  public paymentMethods: any;
  constructor(
    public payService: PaymentService
  ) { }
  ngOnInit() {
    Utils.log('Payment widget loaded...');
    this.payService.paymentMethods('EN')
  }
}
