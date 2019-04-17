import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';

import { AppComponent } from './app.component';

import { createCustomElement } from '@angular/elements';
import { PaymentService } from './services/payment.service';
import { InformerService } from './services/informer.service';
import { HttpClientModule } from '@angular/common/http';
import { PreloadImgDirective } from './directives/imgPreload.directive';
//import { GeoLocService } from './services/geolocation.service';

@NgModule({
  declarations: [
    AppComponent,
    PreloadImgDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    InformerService,
    //GeoLocService,
    PaymentService
  ],
  bootstrap: [],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule {
constructor(private injector: Injector) { }
  ngDoBootstrap() {
    const widgetElement = createCustomElement(AppComponent,
      { injector: this.injector });
    customElements.define('pay-widget', widgetElement);
  }
 }
