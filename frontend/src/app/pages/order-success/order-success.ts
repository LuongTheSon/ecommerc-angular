import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [MatIcon, MatButton, RouterLink],
  template: `
    <div>
      <mat-icon>check_circle</mat-icon>
      <h1 class="text-2xl font-bold">Order Success</h1>
      <p>Your order has been placed successfully.</p>
      <button matButton="filled" class="w-full mt-6 py-3" routerLink="/products/all">
        Continue Shopping
      </button>
    </div>
  `,
  styles: ``,
})
export default class OrderSuccess {}
