import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from './header-actions/header-actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions, RouterLink],
  template: `
    <mat-toolbar class="w-full elevated py-2">
      <div class="flex items-center justify-between max-w-[1200px] mx-auto w-full ">
        <a
          routerLink="/"
          class="text-2xl font-bold hover:opacity-80 transition-opacity cursor-pointer"
          >Ecommerce</a
        >
        <app-header-actions />
      </div>
    </mat-toolbar>
  `,
  styles: ``,
})
export class Header {}
