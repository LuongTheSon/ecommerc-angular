import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ListCart } from './list-cart/list-cart';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { MatButton } from '@angular/material/button';
import { ecommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-cart',
  imports: [BackButton, ListCart, SummarizeOrder, MatButton],
  template: `
    <div class="max-w-[1200px] mx-auto py-6">
      <app-back-button navigateTo="/products/all">Quay lại trang sản phẩm</app-back-button>
      <h1 class="text-2xl font-bold my-4">Giỏ Hàng</h1>

      <div class="flex gap-4">
        <app-list-cart class="w-full"></app-list-cart>
        <app-summarize-order class="w-[300px] flex-shrink-0">
          <ng-container actionButtons>
            <button matButton="filled" class="w-full mt-6 py-3" (click)="store.proceedToCheckout()">
              Thanh toán
            </button>
          </ng-container>
        </app-summarize-order>
      </div>
    </div>
  `,
  styles: ``,
})
export default class Cart {
  store = inject(ecommerceStore);
}
