import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ecommerceStore } from '../ecommerce-store';

export const canCheckoutGuard: CanActivateFn = () => {
  const store = inject(ecommerceStore);
  const router = inject(Router);

  if (store.cartItems().length > 0) {
    return true;
  }

  router.navigate(['/cart']);
  return false;
};
