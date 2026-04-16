import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stock-status',
  imports: [MatIcon],
  template: `
    @if (inStock()) {
      <div
        class="flex items-center gap-2 border border-green-500 rounded-lg px-2 py-1 bg-white w-full success"
      >
        <mat-icon class="!text-green-500">check_circle</mat-icon>
        <p class="text-green-500">có hàng, sẵn sàng giao hàng</p>
      </div>
    } @else {
      <div
        class="flex items-center gap-2 border border-red-500 rounded-lg px-2 py-1 bg-white w-full danger"
      >
        <mat-icon class="small !text-red-500">warning</mat-icon>
        <p class="text-red-500">Hết hàng. Chúng tôi sẽ thông báo khi có hàng trở lại.</p>
      </div>
    }
  `,
  styles: ``,
})
export class StockStatus {
  inStock = input(false);
}
