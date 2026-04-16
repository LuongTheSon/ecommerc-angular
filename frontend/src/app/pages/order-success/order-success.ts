import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [MatIcon, MatButton, RouterLink],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-blue-50 px-4 py-8"
    >
      <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center space-y-6">
        <!-- Success Icon -->
        <div class="flex justify-center">
          <div class="relative">
            <mat-icon class="!text-7xl !w-24 !h-24 text-green-500">check_circle</mat-icon>
            <div
              class="absolute inset-0 animate-pulse bg-green-400 rounded-full blur-2xl opacity-20"
            ></div>
          </div>
        </div>

        <!-- Title -->
        <div class="space-y-3">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800">Xác nhận đặt hàng</h1>
          <p class="text-base md:text-lg text-gray-600 leading-relaxed">
            Đơn hàng của bạn đã được đặt thành công. Chúng tôi đang chuẩn bị nó cho việc giao hàng!
          </p>
        </div>

        <!-- Details -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-left">
          <p class="text-sm text-gray-600">
            <span class="font-semibold text-gray-800">trạng thái:</span>
            <span class="text-green-600 ml-2">✓ Xác nhận</span>
          </p>
          <p class="text-sm text-gray-600">
            <span class="font-semibold text-gray-800">Thời gian giao hàng:</span>
            <span class="text-blue-600 ml-2">3-5 ngày làm việc</span>
          </p>
        </div>

        <!-- Action Button -->
        <button
          matButton="filled"
          class="w-full py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
          routerLink="/products/all"
        >
          Tiếp tục mua sắm
        </button>

        <!-- Secondary Action -->
        <button matButton="text" class="w-full py-2 text-sm md:text-base" routerLink="/">
          Quay về trang chủ
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export default class OrderSuccess {}
