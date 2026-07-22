import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  BaseButtonDirective,
  BaseInputDirective,
  CardComponent,
  InputGroupComponent,
  LabelComponent,
} from 'Base';
import { AuthService } from '../../core/auth/auth';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink,
    CardComponent,
    InputGroupComponent,
    LabelComponent,
    BaseInputDirective,
    BaseButtonDirective,
  ],
  templateUrl: './register.html',
})
export class Register {
  private readonly auth = inject(AuthService);

  firstName = '';
  lastName = '';
  email = '';
  password = '';

  submit(): void {
    // Building a complex multi-step onboarding flow after registration? Check out the Pro layout-onboarding-flow and form-wizard blocks.
    this.auth.register(this.email || 'demo@base-ui.net', this.password);
  }
}
