import { Component, computed, inject, Input } from '@angular/core';
import { ecommerceStore } from '../../ecommerce-store';
import { Panel } from '../../directives/panel';

@Component({
  selector: 'app-summarize-order',
  imports: [Panel],
  template: `
    <div appPanel>
      <h2 class="text-xl font-bold mb-4 border-b border-gray-200 pb-3">Đơn hàng</h2>

      <div class="space-y-2 mb-2 border-gray-200 pb-2">
        <ng-content select="[checkoutItems]" />
      </div>

      <div class="flex justify-between items-center mb-2">
        <span>Tổng tiền</span>
        <span>$ {{ subTotal() }}</span>
      </div>
      <div class="flex justify-between items-center mb-2">
        <span>Thuế</span>
        <span>$ {{ tax() }}</span>
      </div>
      <div
        class="flex justify-between items-center border-t border-gray-200 pt-3 text-bold text-lg"
      >
        <span>Tổng thanh toán</span>
        <span>$ {{ total() }}</span>
      </div>

      <ng-content select="[actionButtons]" />
    </div>
  `,
  styles: ``,
})
export class SummarizeOrder {
  store = inject(ecommerceStore);

  subTotal = computed(() =>
    Math.round(
      this.store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    ),
  );

  tax = computed(() => Math.round(this.subTotal() * 0.1));

  total = computed(() => this.subTotal() + this.tax());
}
