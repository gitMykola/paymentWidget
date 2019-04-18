import { Component } from "@angular/core";
import { PaymentService } from '../../services';

@Component({
  selector: 'app-method',
  templateUrl: 'paymentMethods.component.html',
  styleUrls: ['paymentMethods.component.css']
})
export class PaymentMethodsComponent {
  constructor(
    public payService: PaymentService
  ) { }
}
