import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('token'))
    return true;
  return false;
};
