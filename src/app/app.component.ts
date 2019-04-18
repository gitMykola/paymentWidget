import { Component, OnInit, Input } from '@angular/core';
import { Utils } from './lib/utils';
import { PaymentService } from './services/payment.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms'; 

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
  public paymentForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public payService: PaymentService
  ) {
  }
  ngOnInit() {
    Utils.log('Payment widget loaded...');
    this.payService.init();
    this.buildForm();
  }
  buildForm() {
    this.paymentForm = this.formBuilder.group({
      'cardHolderName': [null, [Validators.required, Validators.minLength(2),
      Validators.maxLength(256)]],
      'cardNumber': [null, [Validators.required, Validators.minLength(3),
      Validators.maxLength(256)]],
      'expDateMM': [null, [Validators.required, Validators.minLength(2),
        Validators.maxLength(2)]],
      'expDateYY': [null, [Validators.required, Validators.minLength(2),
      Validators.maxLength(2)]],
      'cvv': [null, [Validators.required, Validators.min(0),
      Validators.max(4)]]
    });
  }
  onSubmit() {
    Utils.log('Form Subbmit!');
  }
}
