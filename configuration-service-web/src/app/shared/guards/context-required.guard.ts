import { CanActivateFn } from '@angular/router';

export const contextRequiredGuard: CanActivateFn = (route, state) => {
  return true;
};
