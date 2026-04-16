import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { ecommerceStore } from '../../ecommerce-store';
import { ProductsCard } from '../../components/products-card/products-card';
import { MatButton } from '@angular/material/button';
import { EmptyWishlist } from './empty-wishlist/empty-wishlist';

@Component({
  selector: 'app-my-wishlist',
  imports: [BackButton, ProductsCard, MatButton, EmptyWishlist],
  template: `
    <div class="max-w-[1200px] mx-auto">
      <app-back-button navigateTo="/products/all">Tiếp tục mua sắm</app-back-button>
      @if (store.wishlistCount() > 0) {
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold my-4">Danh sách yêu thích</h1>
          <span class="text-xl text-gray-500">({{ store.wishlistCount() }} items)</span>
        </div>
        <div class="responsive-grid">
          @for (product of store.wishlistItems(); track product.id) {
            <app-products-card [product]="product"></app-products-card>
          }
        </div>

        <div class="flex mt-8 justify-center">
          <button matButton="outlined" class="danger" (click)="store.clearWishlist()">
            Clear Wishlist
          </button>
        </div>
      } @else {
        <app-empty-wishlist></app-empty-wishlist>
      }
    </div>
  `,
  styles: ``,
})
export default class MyWishlist {
  store = inject(ecommerceStore);
}
