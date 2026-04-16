import { Component, inject } from '@angular/core';
import { Panel } from '../../../directives/panel';
import { ecommerceStore } from '../../../ecommerce-store';
import { ItemCart } from '../item-cart/item-cart';

@Component({
  selector: 'app-list-cart',
  imports: [Panel, ItemCart],
  template: `
    <div appPanel>
      <h2 class="text-xl font-bold mb-4">Sản phẩm ({{ store.cartCount() }})</h2>
      <div class="flex flex-col gap-6">
        @for (item of store.cartItems(); track item.product.id) {
          <app-item-cart [item]="item"></app-item-cart>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class ListCart {
  store = inject(ecommerceStore);
}
