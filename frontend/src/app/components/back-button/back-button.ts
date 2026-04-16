import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-back-button',
  imports: [MatButton, MatIcon, RouterLink],
  template: `
    <button matButton="text" [routerLink]="navigateTo() ?? 'null'" class="flex items-center gap-2">
      <mat-icon>arrow_back</mat-icon>
      <ng-content></ng-content>
    </button>
  `,
  styles: ``,
})
export class BackButton {
  navigateTo = input<string>();
}
