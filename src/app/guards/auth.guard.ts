import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const session = inject(AuthenticationService);
  const router = inject(Router)

  if(session.getItem('token') != null){
    return true
  }

  return router.createUrlTree(['/login']);
};
