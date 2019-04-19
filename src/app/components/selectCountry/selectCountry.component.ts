import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services';
import { Country } from '../../lib/paymentInterfaces';
import * as Countries from '../../../app/countryList.json';

/*
 * Country selector component
 */
@Component({
  selector: 'app-country',
  templateUrl: 'selectCountry.component.html',
  styleUrls: ['selectCountry.component.css']
})
export class SelectorCountryComponent implements OnInit {
  public countries: Country[] = [];
  constructor(
    public payService: PaymentService
  ) { }
  ngOnInit() {
    const self = this;
    Countries.default.map(c => {
      self.countries.push({ code: c.Code, name: c.Name });
    });
  }
  selectCountry(event) {
    this.payService.paymentMethods(this.countries
      .find(c => c.name === event.target.value).code);
  }
}
