import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  BaseButtonDirective,
  BaseInputDirective,
  CardComponent,
  InputGroupComponent,
  LabelComponent,
} from 'Base';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    RouterLink,
    CardComponent,
    InputGroupComponent,
    LabelComponent,
    BaseInputDirective,
    BaseButtonDirective,
  ],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  email = '';
  protected readonly sent = signal(false);

  submit(): void {
    this.sent.set(true);
  }
}
