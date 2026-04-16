import { Component, inject, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ecommerceStore } from '../../ecommerce-store';
import { signUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatIconButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatPrefix,
    MatSuffix,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-8 max-w-[400px] mx-auto">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold mb-4">Tạo tài khoản</h2>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <p class="text-gray-500 mb-4">Tạo tài khoản để tiếp tục</p>
      <form [formGroup]="signUpForm" (ngSubmit)="signUp()">
        <mat-form-field appearance="outline">
          <input matInput formControlName="name" type="text" placeholder="Enter your name" />
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <input matInput formControlName="email" type="email" placeholder="Enter your email" />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <input
            matInput
            formControlName="password"
            placeholder="Enter your password"
            [type]="passwordVisible() ? 'text' : 'password'"
          />
          <mat-icon matPrefix>lock</mat-icon>
          <button
            matSuffix
            matIconButton
            type="button"
            class="mr-2"
            (click)="passwordVisible.set(!passwordVisible())"
          >
            <mat-icon [fontIcon]="passwordVisible() ? 'visibility' : 'visibility_off'"></mat-icon>
          </button>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <input
            matInput
            formControlName="confirmPassword"
            placeholder="Confirm your password"
            [type]="passwordVisible() ? 'text' : 'password'"
          />
          <mat-icon matPrefix>lock</mat-icon>
          <button
            matSuffix
            matIconButton
            type="button"
            class="mr-2"
            (click)="passwordVisible.set(!passwordVisible())"
          >
            <mat-icon [fontIcon]="passwordVisible() ? 'visibility' : 'visibility_off'"></mat-icon>
          </button>
        </mat-form-field>
        <button matButton="filled" type="submit" class="w-full">Tạo tài khoản</button>
        <p class="text-sm text-gray-500 mt-2 text-center">
          Đã có tài khoản?
          <a class="text-blue-500 cursor-pointer" (click)="openSignInDialog()">Đăng nhập</a>
        </p>
      </form>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);

  store = inject(ecommerceStore);

  dialogRef = inject(MatDialogRef);

  matDialog = inject(MatDialog);

  passwordVisible = signal(false);

  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  signUpForm = this.fb.group({
    name: ['Test User', Validators.required],
    email: ['test@example.com', Validators.email],
    password: ['test123', Validators.required],
    confirmPassword: ['test123', Validators.required],
  });

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
    }

    const { name, email, password } = this.signUpForm.value;

    this.store.signUp({ name, email, password, dialogId: this.dialogRef.id } as signUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}
