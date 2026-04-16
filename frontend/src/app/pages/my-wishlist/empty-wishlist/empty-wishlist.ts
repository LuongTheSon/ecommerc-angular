import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-wishlist',
  imports: [MatIcon, MatButton, RouterLink],
  template: `
    <div class="flex flex-col justify-center items-center gap-4 max-w-[1200px] mx-auto my-10">
      <div class="flex flex-col justify-center items-center gap-4 bg-gray-100 rounded-full p-4">
        <mat-icon class="text-6xl !text-red-500">favorite</mat-icon>
      </div>
      <h1 class="text-2xl font-bold my-4">Danh sách yêu thích của bạn trống</h1>
      <p class="text-gray-500 mb-4">Thêm sản phẩm vào danh sách yêu thích để bắt đầu</p>
      <button matButton="filled" class="min-w-[200px] py-3 text-lg" routerLink="/products/all">
        Bắt đầu mua sắm
      </button>
    </div>
  `,
  styles: ``,
})
export class EmptyWishlist {}
