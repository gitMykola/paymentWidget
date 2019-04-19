import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { PaymentMethod, Country } from '../lib/paymentInterfaces';
import { Utils } from '../lib/utils';
import { InformerService } from './informer.service';
import * as Countries from '../countryList.json';

/*
 * Main app servive to interact with PaymentWall API
 */
@Injectable()
export class PaymentService {
  private countries: Country[] = [];
  public selectedMethod: PaymentMethod;
  public methods: PaymentMethod[];
  public country: Country;
  constructor(
    private http: HttpClient,
    private infoService: InformerService
  ) { }
  init() {
    const self = this;
    Countries.default.map(c => {
      self.countries.push({ code: c.Code, name: c.Name });
    });
    this.getCountryFromPaymentWall().subscribe((country: Country) => {
      if (!country) {
        this.infoService.setInfo({
          type: 2,
          message: 'Country from PaymentWall unavilabel.' +
            '\n Set default country ' + Config.DEFAULT_COUNTRY.name
        });
      }
      this.country = country ? country
        : Config.DEFAULT_COUNTRY;
      this.paymentMethods(this.country.code);
    }, error => {
      this.infoService.setInfo({
        type: 2,
        message: 'PaymentWall API unavilabel.' +
          '\n Set default country ' + Config.DEFAULT_COUNTRY.name
      });
      this.country = Config.DEFAULT_COUNTRY;
      Utils.log(error);
    });
  }
  paymentMethods(countryCode: string) {
    this.getPaymentMethods(countryCode)
      .subscribe(data => {
        this.methods = data;
        if (data.length > 0) {
          this.selectedMethod = data[0];
        } else {
          this.infoService.setInfo({
            type: 1,
            message: 'PaymentWall has no payment methods for ' +
              this.countries.find((c: Country) => {
              return c.code === countryCode;
              }).name + '. There are no avialable payment methods'
          });
        }
      }, error => {
        this.infoService.setInfo({
          type: 2,
          message: 'PaymentWall service unavilabel.' +
            ' No avialable payment methods'
        });
        this.methods = [];
        Utils.log(error);
      });
  }
  selectMethod(id: string) {
    this.selectedMethod = this.methods.find(method =>
      method.id === id);
  }
  private getPaymentMethods = (countryCode: string): Observable<PaymentMethod[]> => {
    const url = Config.PAYMENT_SYSTEM_URL + 'payment-systems/'
      + '?key=' + Config.PROJECT_KEY + '&country_code='
      + countryCode;
    return this.http.get(url).pipe(
      map((response: any) => {
        if (!response.map) {
          return [];
        } else {
          return response.map(item => {
            return {
              id: item.id,
              name: item.name,
              img_url: item.img_url
            };
          });
        }
      })
    );
  }
  private getCountryFromPaymentWall(): Observable<Country> {
    const url = Config.PAYMENT_SYSTEM_URL +
      'rest/country?key=' + Config.PROJECT_KEY + '&uid=1';
    return this.http.get(url).pipe(
      map((response: any) => {
        if (response.code && response.country) {
          return response;
        } else {
          Utils.log('Country request error by URL: ' + url);
          return null;
        }
      })
    );
  }
}
