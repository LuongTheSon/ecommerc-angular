import { Component, computed, inject, input } from '@angular/core';
import { cartItem } from '../../../models/cart';
import { QtySelector } from '../qty-selector/qty-selector';
import { MatIcon } from '@angular/material/icon';
import { ecommerceStore } from '../../../ecommerce-store';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-item-cart',
  imports: [QtySelector, MatIcon, MatIconButton],
  template: `
    <div class="flex items-center justify-between gap-4 ">
      <img
        [src]="item().product.imageUrl"
        [alt]="item().product.name"
        class="w-24 h-24 object-cover rounded-lg aspect-square"
      />
      <div class="flex flex-col gap-2 w-[400px]">
        <h3 class="text-lg font-bold">{{ item().product.name }}</h3>
        <p class="text-sm text-gray-500">{{ item().product.description }}</p>
      </div>
      <app-qty-selector
        [quantity]="item().quantity"
        (qtyUpdate)="store.setItemQuantity({ product: item().product, quantity: $event })"
      />

      <div class="text-right font-semibold text-lg">$ {{ totalPrice() }}</div>
      <div class="flex items-center gap-2">
        <button matIconButton class="danger" (click)="store.removeItemFromCart(item().product)">
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class ItemCart {
  item = input.required<cartItem>();

  store = inject(ecommerceStore);

  totalPrice = computed(() => (this.item().product.price * this.item().quantity).toFixed(2));
}
