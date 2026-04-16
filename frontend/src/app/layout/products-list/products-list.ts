import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsCard } from '../../components/products-card/products-card';
import { MatSidenav, MatSidenavContent, MatSidenavContainer } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { ecommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-products-list',
  imports: [
    ProductsCard,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    MatNavList,
    MatListItem,
    RouterLink,
  ],
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg font-bold text-gray-700">Menu</h2>

          <mat-nav-list>
            @for (cat of categories(); track cat) {
              <mat-list-item
                [activated]="cat === category()"
                class="mb-2"
                [routerLink]="['/products', cat]"
              >
                <span
                  matListItemTitle
                  class="font-medium"
                  [class]="cat === category() ? '!text-white' : ''"
                  >{{ cat }}</span
                >
              </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="p-6 bg-gray-100 h-full">
        <h1 class="text-2xl font-bold text-gray-700">{{ category() }}</h1>
        <p class="text-base text-gray-500 mb-6">
          {{ store.filteredProducts().length }} sản phẩm tìm thấy
        </p>
        <div class="responsive-grid">
          @for (product of store.filteredProducts(); track product.id) {
            <app-products-card [product]="product" />
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsList {
  category = input<string>('all');

  store = inject(ecommerceStore); // Dùng để lấy data từ ngoài vào trong component

  categories = signal<string[]>(['All', 'Soft Drink', 'Water', 'Tea', 'Beer']);

  constructor() {
    this.store.setCategory(this.category);
  }
}
