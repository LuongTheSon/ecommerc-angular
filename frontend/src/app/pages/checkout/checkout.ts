import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { PaymentForm } from './payment-form/payment-form';
import { ShippingForm } from './shipping-form/shipping-form';
import { SummarizeOrder } from '../../components/summarize-order/summarize-order';
import { ecommerceStore } from '../../ecommerce-store';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-checkout',
  imports: [BackButton, PaymentForm, ShippingForm, SummarizeOrder, MatButton],
  template: `
    <div class="max-w-[1200px] mx-auto py-6">
      <app-back-button navigateTo="/cart">Quay lại giỏ hàng</app-back-button>
      <h1 class="text-2xl font-bold my-4">Thanh toán</h1>
      <div class="flex gap-4">
        <div class="flex flex-col gap-4">
          <app-shipping-form></app-shipping-form>
          <app-payment-form></app-payment-form>
        </div>
        <app-summarize-order class="w-[350px] flex-shrink-0">
          <ng-container checkoutItems>
            @for (item of store.cartItems(); track item.product.id) {
              <div class="flex justify-between items-center text-sm ">
                <span class="whitespace-nowrap">{{ item.product.name }} x {{ item.quantity }}</span>
                <span class="whitespace-nowrap"
                  >$ {{ (item.product.price * item.quantity).toFixed(2) }}</span
                >
              </div>
            }
          </ng-container>
          <ng-container actionButtons>
            <button
              matButton="filled"
              class="w-full mt-6 py-3"
              [disabled]="store.loading()"
              (click)="store.placeOrder()"
            >
              {{ store.loading() ? 'Đặt hàng...' : 'Đặt hàng' }}
            </button>
          </ng-container>
        </app-summarize-order>
      </div>
    </div>
  `,
  styles: ``,
})
export default class Checkout {
  store = inject(ecommerceStore);
}
