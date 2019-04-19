import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';

import {
  AppComponent,
  PaymentMethodsComponent,
  SelectorCountryComponent
} from '../app/components';

import { createCustomElement } from '@angular/elements';
import {
  PaymentService,
  InformerService
} from './services';
import { HttpClientModule } from '@angular/common/http';
import { PreloadImgDirective } from './directives/imgPreload.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PreloadImgDirective,
    SelectorCountryComponent,
    PaymentMethodsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    InformerService,
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
