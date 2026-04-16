import { Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-qty-selector',
  imports: [MatIconButton, MatIcon],
  template: `
    <div class="flex items-center gap-3">
      <div class="inline-flex items-center">
        <button
          matIconButton="text"
          [disabled]="quantity() === 1"
          (click)="qtyUpdate.emit(quantity() - 1)"
        >
          <mat-icon>remove</mat-icon>
        </button>
        <span class="text-lg font-bold px-3">{{ quantity() }}</span>
        <button
          matIconButton="text"
          [disabled]="quantity() === 10"
          (click)="qtyUpdate.emit(quantity() + 1)"
        >
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class QtySelector {
  quantity = input(0);
  qtyUpdate = output<number>();
}
