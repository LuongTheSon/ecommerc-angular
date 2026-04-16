import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { ecommerceStore } from '../../ecommerce-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-card',
  imports: [MatIcon, MatButton, RouterLink],
  template: `
    <div
      class="relative flex flex-col gap-2 bg-gray-100 rounded-lg border border-gray-200 p-4 cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
    >
      <button
        class="flex items-center justify-center !absolute top-5 right-5 w-10 h-10 rounded-md cursor-pointer transition-all duration-300 border-0 shadow-md hover:scale-110 hover:shadow-lg !bg-white"
        [class]="isInWishlist() ? '!text-red-500' : '!text-gray-500'"
        matIconButton
        (click)="toggleWishlist(product())"
        [style.view-transition-name]="'product-image' + product().id"
      >
        <mat-icon>{{ isInWishlist() ? 'favorite' : 'favorite_border' }}</mat-icon>
      </button>
      <img
        [src]="product().imageUrl"
        [alt]="product().name"
        class="w-full h-48 object-cover rounded-lg"
        [routerLink]="['/product', product().id]"
      />
      <h2 class="text-lg font-bold text-gray-700" [routerLink]="['/product', product().id]">
        {{ product().name }}
      </h2>
      <p class="text-gray-500 mb-2 h-[60px]">{{ product().description }}</p>
      <div
        class="text-sm font-medium mb-2"
        [class]="product().inStock ? 'text-green-500' : 'text-red-500'"
      >
        {{ product().inStock ? 'In Stock' : 'Out of Stock' }}
      </div>

      <div class="flex justify-between items-center">
        <span class="text-2xl text-gray-500 font-bold"> \${{ product().price }}</span>
        <button
          matButton="filled"
          class="flex items-center gap-2"
          (click)="store.addToCart(product())"
        >
          <mat-icon>shopping_cart</mat-icon>
          Add to Cart
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductsCard {
  product = input.required<Product>();

  store = inject(ecommerceStore);

  isInWishlist = computed(() => this.store.wishlistItems().find((p) => p.id === this.product().id));
  toggleWishlist(product: Product) {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
