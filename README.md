# PayWidget

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --prod --single-bundle true --output-hashing none --vendor-chunk false`
to build the project. The build artifacts will be stored in the `dist/` directory.

## Hot to apply pay-widget

After building just insert to your page `<pay-widget ammount="23.45 USD"></pay-widget>`
Do not forget upload to some hosting script from `dist/pay-widget/main.js` and insert
in you page `<script src="${href_to_main.js_on_your_hosting}"></script>`
So, to test pay-widget avialability just run in console
`document.querySelector('pay-widget').ammount = '123.75 USD'`
If all ok, you'll see in top of payment form your amount

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
