import { Routes } from '@angular/router';
import { canCheckoutGuard } from './guards/can-checkout.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products/all',
  },
  // setting Routes
  {
    path: 'products/:category',
    loadComponent: () => import('./layout/products-list/products-list'),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail'),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/my-wishlist/my-wishlist'),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart'),
  },
  {
    path: 'checkout',
    canActivate: [canCheckoutGuard],
    loadComponent: () => import('./pages/checkout/checkout'),
  },
  {
    path: 'order-success',
    loadComponent: () => import('./pages/order-success/order-success'),
  },
];
