import { Component, inject } from '@angular/core';
import {
  AvatarComponent,
  BadgeComponent,
  BaseButtonDirective,
  DropdownMenuDirective,
  DropdownMenuComponent,
  DropdownMenuItemComponent,
  IconComponent,
  IconButtonDirective,
} from 'Base';
import { DialogService } from '../../components/dialog/dialog.service';
import { User } from '../../core/models/user';
import { UsersService } from '../../core/users/users';
import { UserDeleteDialog } from './user-delete-dialog/user-delete-dialog';
import { UserFormDialog } from './user-form-dialog/user-form-dialog';

@Component({
  selector: 'app-users',
  imports: [
    BaseButtonDirective,
    AvatarComponent,
    BadgeComponent,
    IconComponent,
    IconButtonDirective,
    DropdownMenuComponent,
    DropdownMenuItemComponent,
    DropdownMenuDirective,
  ],
  templateUrl: './users.html',
})
export class Users {
  private readonly dialog = inject(DialogService);
  protected readonly usersService = inject(UsersService);

  openCreate(): void {
    this.dialog.open(UserFormDialog, { mode: 'create' as const }).subscribe();
  }

  openEdit(user: User): void {
    this.dialog.open(UserFormDialog, { mode: 'edit' as const, user }).subscribe();
  }

  openDelete(user: User): void {
    this.dialog.open(UserDeleteDialog, { user }).subscribe();
  }
}
