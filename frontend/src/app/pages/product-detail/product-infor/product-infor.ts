import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product';
import { TitleCasePipe } from '@angular/common';
import { StockStatus } from '../stock-status/stock-status';
import { QtySelector } from '../../cart/qty-selector/qty-selector';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ecommerceStore } from '../../../ecommerce-store';
import { ToggleWishlistButton } from '../../../components/toggle-wishlist-button/toggle-wishlist-button';

@Component({
  selector: 'app-product-infor',
  imports: [
    TitleCasePipe,
    StockStatus,
    QtySelector,
    MatButton,
    MatIcon,
    MatIconButton,
    ToggleWishlistButton,
  ],
  template: `
    <p class="text-xs rounded-xl bg-gray-200 px-2 py-1 w-fit mb-3">
      {{ product().category | titlecase }}
    </p>
    <h2 class="text-3xl font-bold mb-6">{{ product().name }}</h2>
    <p class="text-gray-500 text-2xl font-bold mb-4">$ {{ product().price }}</p>
    <app-stock-status [inStock]="product().inStock"></app-stock-status>
    <p class="text-lg font-semibold mb-2 mt-4">Mô tả sản phẩm</p>
    <p class="text-gray-600 border-b border-gray-500 pb-4">{{ product().description }}</p>
    <div class="flex items-center gap-2 mb-3 pt-4">
      <p class="text-gray-700">Số lượng</p>
      <app-qty-selector
        [quantity]="quantity()"
        (qtyUpdate)="quantity.set($event)"
      ></app-qty-selector>
    </div>
    <div class="flex gap-4 mb border-b border-gray-500 pb-4">
      <button
        matButton="filled"
        class="flex items-center gap-2"
        (click)="store.addToCart(product(), quantity())"
        [disabled]="!product().inStock"
      >
        <mat-icon>shopping_cart</mat-icon>
        Thêm vào giỏ hàng
      </button>
      <app-toggle-wishlist-button [product]="product()"></app-toggle-wishlist-button>
      <button matIconButton>
        <mat-icon>share</mat-icon>
      </button>
    </div>
    <div class="flex flex-col gap-2 mt-4">
      <p class="flex items-center gap-3">
        <mat-icon>local_shipping</mat-icon>
        <span>Miễn phí vận chuyển</span>
      </p>
      <p class="flex items-center gap-3">
        <mat-icon>autorenew</mat-icon>
        <span>Đổi trả miễn phí</span>
      </p>
      <p class="flex items-center gap-3">
        <mat-icon>shield</mat-icon>
        <span>Bảo hành 3 tháng</span>
      </p>
    </div>
  `,
  styles: ``,
})
export class ProductInfor {
  product = input.required<Product>();

  store = inject(ecommerceStore);

  quantity = signal(1);
}
