import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  BaseButtonDirective,
  BaseInputDirective,
  CardComponent,
  CheckboxComponent,
  InputGroupComponent,
  LabelComponent,
} from 'Base';
import { AuthService } from '../../core/auth/auth';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    CardComponent,
    InputGroupComponent,
    LabelComponent,
    BaseInputDirective,
    CheckboxComponent,
    BaseButtonDirective,
  ],
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(AuthService);

  email = 'demo@base-ui.net';
  password = 'password';

  submit(): void {
    this.auth.login(this.email, this.password);
  }
}
