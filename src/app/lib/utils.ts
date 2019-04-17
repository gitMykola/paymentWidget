import { environment } from '../../environments/environment';

export const Utils = {
  log(data: string): void {
    if (!environment.production) {
      console.log(data);
    }
  }
};
