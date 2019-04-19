import { Injectable, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from '../lib/utils';
import { Info } from '../lib/paymentInterfaces';

/*
 * Injectable service to set/emit info, warnings, errors
 * beetwin app components & services
 */
@Injectable()
export class InformerService {
  public info = new EventEmitter<Info>();
  public setInfo(data: Info) {
    Utils.log(data.type + '\n' + data.message);
    this.info.emit(data);
  }
}
