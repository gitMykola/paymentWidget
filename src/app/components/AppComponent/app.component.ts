import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Utils } from '../../lib/utils';
import { PaymentService, InformerService } from '../../services';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Info } from '../../lib/paymentInterfaces';

/*
 * Entry app component
 */
@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // input amount validation regexp
  private inputValidator = new RegExp(/^\d{0,10}\.?\d{0,10}\s[a-z]{3,33}$/i);
  @Input('amount')
  set amount(amount: string) {
    // validate input data
    if (!!amount && this.inputValidator.test(amount)) {
      const data = amount.split(' ');
      this.paymentAmount = Number((Number(data[0])).toFixed(2));
      this.paymentCurrency = data[1].toUpperCase();
      this.infoService.setInfo({
        type: 0,
        message: ''
      });
    } else {
      const err = 'Amount should be like \'5.27 USD\'';
      Utils.log(err);
      this.infoService.setInfo({
        type: 2,
        message: err
      });
    }
  }
  public paymentAmount: number;
  public paymentCurrency: string;
  public info: Info;
  public paymentMethods: any;
  public paymentForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public payService: PaymentService,
    public infoService: InformerService
  ) {
  }
  ngOnInit() {
    Utils.log('Payment widget loaded...');
    this.payService.init();
    this.buildForm();
    this.infoService.info.subscribe((data: Info) => {
      this.info = Object.assign(data);
      setTimeout(() => {
        this.info.message = '';
      }, 5000);
    });
  }
  buildForm() {
    this.paymentForm = this.formBuilder.group({
      cardHolderName: [null, [Validators.required,
        this.validateValue(new RegExp(/^[a-z,\s]{1,150}$/i))]],
      cardNumber: [null, [Validators.required,
        this.validateValue(new RegExp(/^[0-9,\s]{4,24}$/)),
        this.validateCardNumber()
      ]],
      expDateMM: [null, [Validators.required,
        this.validateValue(new RegExp(/^1[0-2]$|^0[1-9]$|^[1-9]{1}$/))]],
      expDateYY: [null, [Validators.required,
        this.validateValue(new RegExp(/^1[9]$|^[2-9][0-9]$/))]],
      cvv: [null, [Validators.required,
        this.validateValue(new RegExp(/^[0-9]{1,6}$/))]]
    });
  }
  onSubmit() {
    Utils.log('Form Subbmit!');
    this.infoService.setInfo({
      type: 0,
      message: 'Data ready to processing...'
    });
  }
  validateValue(reg: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return reg.test(control.value) ? null
        : { failure: control.value };
    };
  }
  validateCardNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this.validCreditCard(control.value) ? null
        : { failure: control.value };
    };
  }
  validCreditCard(val) {
    let value = (val + '').replace(/\s/, '');
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) { return false; }

    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0;
    let nDigit = 0;
    let bEven = false;
    value = value.replace(/\D/g, '');

    for (let n = value.length - 1; n >= 0; n--) {
      const cDigit = value.charAt(n);
      nDigit = parseInt(cDigit, 10);

      if (bEven) {
        nDigit *= 2;
        if (nDigit > 9) { nDigit -= 9; }
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return (nCheck % 10) === 0;
  }
  ngOnDestroy() {
    this.infoService.info.unsubscribe();
  }
}
