import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { PaymentMethod } from '../lib/paymentInterfaces';

@Injectable()
export class PaymentService {
  public selectedMethod: PaymentMethod;
  public methods: PaymentMethod[];
  constructor(
    private http: HttpClient
  ) { }
  paymentMethods(countryCode: string) {
    this.getPaymentMethods(countryCode).subscribe(data => {
      this.methods = data;
    });
  }
  selectMethod(id: string) {
    this.selectedMethod = this.methods.filter(method =>
      method.id === id)[0];
  }
  private getPaymentMethods = (countryCode: string): Observable<PaymentMethod[]> => {
    const url = Config.PAYMENT_SYSTEM_URL
      + '?key=' + Config.PROJECT_KEY + '&Pcountry_code='
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
      }),
      catchError(error => {
        throw (!!error.error ? error.error : error.statusText);
      })
    );
  }
}
