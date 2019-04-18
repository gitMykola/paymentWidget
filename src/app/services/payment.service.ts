import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { PaymentMethod, Country } from '../lib/paymentInterfaces';
import { Utils } from '../lib/utils';

@Injectable()
export class PaymentService {
  public selectedMethod: PaymentMethod;
  public methods: PaymentMethod[];
  public country: Country;
  constructor(
    private http: HttpClient
  ) { }
  init() {
    this.getCountryFromPaymentWall().subscribe((country: Country) => {
      this.country = country ? country
        : Config.DEFAULT_COUNTRY;
      this.paymentMethods(this.country.code);
    }, error => {
      this.country = Config.DEFAULT_COUNTRY;
      Utils.log(error);
    });
  }
  paymentMethods(countryCode: string) {
    this.getPaymentMethods(countryCode)
      .subscribe(data => {
        this.methods = data;
        if (data.length) {
          this.selectedMethod = data[0];
        }
      }, error => {
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
        return response.map(item => {
          return {
            id: item.id,
            name: item.name,
            img_url: item.img_url
          }
        });
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
