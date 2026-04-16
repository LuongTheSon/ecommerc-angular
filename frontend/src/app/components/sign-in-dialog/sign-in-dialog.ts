import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { signInParams } from '../../models/user';
import { ecommerceStore } from '../../ecommerce-store';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-sign-in-dialog',
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
        <h2 class="text-2xl font-bold mb-4">Đăng nhập</h2>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <p class="text-gray-500 mb-4">Đăng nhập để tiếp tục</p>
      <form [formGroup]="signInForm" (ngSubmit)="signIn()">
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
        <button matButton="filled" type="submit" class="w-full">Đăng nhập</button>
        <p class="text-sm text-gray-500 mt-2 text-center">
          Không có tài khoản?
          <a class="text-blue-500 cursor-pointer" (click)="openSignUpDialog()">Tạo tài khoản</a>
        </p>
      </form>
    </div>
  `,
  styles: ``,
})
export class SignInDialog {
  fb = inject(NonNullableFormBuilder);

  store = inject(ecommerceStore);

  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef);

  matDialog = inject(MatDialog);

  passwordVisible = signal(false);

  signInForm = this.fb.group({
    email: ['test@example.com', Validators.email],
    password: ['test123', Validators.required],
  });

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;

    this.store.signIn({
      email,
      password,
      checkout: this.data?.checkout,
      dialogId: this.dialogRef.id,
    } as signInParams);
  }

  openSignUpDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}
