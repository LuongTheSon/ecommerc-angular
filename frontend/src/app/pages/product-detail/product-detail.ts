import { Component, computed, inject, input } from '@angular/core';
import { ecommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { ProductInfor } from './product-infor/product-infor';

@Component({
  selector: 'app-product-detail',
  imports: [BackButton, ProductInfor],
  template: `
    <div class="max-w-[1200px] mx-auto py-6">
      <app-back-button [navigateTo]="backRoute()">Quay Lại</app-back-button>
      @if (store.selectedProduct(); as product) {
        <div class="flex gap-8 mt-4 mb-8">
          <div class="flex-1">
            <img
              [src]="product.imageUrl"
              [alt]="product.name"
              class="w-full h-[500px] object-cover rounded-lg"
              [style.view-transition-name]="'product-image' + product.id"
            />
          </div>
          <div class="flex-1">
            <app-product-infor [product]="product"></app-product-infor>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export default class ProductDetail {
  id = input.required<string>();
  store = inject(ecommerceStore);

  constructor() {
    this.store.setProductId(this.id);
  }

  backRoute = computed(() => `/products/${this.store.category() || 'all'}`);
}
