import { Component, inject } from '@angular/core';
import { Panel } from '../../../directives/panel';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  imports: [Panel, MatFormField, MatInput, MatIcon, MatError, ReactiveFormsModule],
  template: `
    <div appPanel>
      <h2 class="flex items-center gap-2 text-xl font-bold mb-4 pb-3 border-b border-gray-200">
        <mat-icon>local_shipping</mat-icon>
        Thông tin giao hàng
      </h2>
      <form [formGroup]="shippingForm">
        <div class="flex gap-2">
          <mat-form-field appearance="outline" class="w-1/2">
            <input matInput formControlName="firstName" placeholder="Tên" />
            @if (shippingForm.get('firstName')?.invalid && shippingForm.get('firstName')?.touched) {
              <mat-error>Tên là bắt buộc</mat-error>
            }
          </mat-form-field>
          <mat-form-field appearance="outline" class="w-1/2">
            <input matInput formControlName="lastName" placeholder="Họ" />
            @if (shippingForm.get('lastName')?.invalid && shippingForm.get('lastName')?.touched) {
              <mat-error>Họ là bắt buộc</mat-error>
            }
          </mat-form-field>
        </div>
        <mat-form-field appearance="outline" class="w-full">
          <input matInput formControlName="email" type="email" placeholder="Email" />
          @if (shippingForm.get('email')?.invalid && shippingForm.get('email')?.touched) {
            <mat-error>
              @if (shippingForm.get('email')?.errors?.['required']) {
                Email là bắt buộc
              } @else if (shippingForm.get('email')?.errors?.['email']) {
                Email không hợp lệ
              }
            </mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-full">
          <input matInput formControlName="phone" type="tel" placeholder="Số điện thoại" />
          @if (shippingForm.get('phone')?.invalid && shippingForm.get('phone')?.touched) {
            <mat-error>
              @if (shippingForm.get('phone')?.errors?.['required']) {
                Số điện thoại là bắt buộc
              } @else if (shippingForm.get('phone')?.errors?.['pattern']) {
                Số điện thoại không hợp lệ
              }
            </mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-full">
          <input matInput formControlName="address" placeholder="Địa chỉ" />
          @if (shippingForm.get('address')?.invalid && shippingForm.get('address')?.touched) {
            <mat-error>Địa chỉ là bắt buộc</mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-full">
          <input matInput formControlName="postalCode" placeholder="Mã bưu điện" />
          @if (shippingForm.get('postalCode')?.invalid && shippingForm.get('postalCode')?.touched) {
            <mat-error>
              @if (shippingForm.get('postalCode')?.errors?.['required']) {
                Mã bưu điện là bắt buộc
              } @else if (shippingForm.get('postalCode')?.errors?.['pattern']) {
                Mã bưu điện không hợp lệ
              }
            </mat-error>
          }
        </mat-form-field>
      </form>
    </div>
  `,
  styles: ``,
})
export class ShippingForm {
  fb = inject(NonNullableFormBuilder);

  shippingForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    address: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
  });
}
