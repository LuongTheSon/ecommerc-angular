import { Component } from '@angular/core';
import { Panel } from '../../../directives/panel';
import { MatIcon } from '@angular/material/icon';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-payment-form',
  imports: [Panel, MatIcon, MatRadioGroup, MatRadioButton],
  template: `
    <div appPanel>
      <h2 class="flex items-center gap-2 text-xl font-bold mb-4 pb-3 border-b border-gray-200">
        <mat-icon>payment</mat-icon>
        Payment Form
      </h2>
      <div>
        <mat-radio-group class="flex items-center gap-6">
          <mat-radio-button value="1">
            <mat-icon class="small inline-block -translate-y-[-4px]">credit_card</mat-icon>
            Credit Card
          </mat-radio-button>
          <mat-radio-button value="2">
            <mat-icon class="small inline-block -translate-y-[-4px]">paypal</mat-icon>
            PayPal
          </mat-radio-button>
          <mat-radio-button value="3">
            <mat-icon class="small inline-block -translate-y-[-4px]">account_balance</mat-icon>
            Bank Transfer
          </mat-radio-button>
          <mat-radio-button value="4">
            <mat-icon class="small inline-block -translate-y-[-4px]">phone_android</mat-icon>
            Mobile Payment
          </mat-radio-button>
        </mat-radio-group>
      </div>
    </div>
  `,
  styles: ``,
})
export class PaymentForm {}
