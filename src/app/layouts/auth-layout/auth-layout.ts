import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, IconComponent],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
