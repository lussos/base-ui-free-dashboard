import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BaseButtonDirective,
  BaseInputDirective,
  DialogBodyComponent,
  DialogCloseDirective,
  DialogComponent,
  DialogFooterComponent,
  DialogHeaderComponent,
  InputGroupComponent,
  LabelComponent,
  StrokedButtonDirective,
} from 'Base';
import { DialogContext } from '../../../components/dialog/dialog-context';
import { User, UserFormValue, UserRole, UserStatus } from '../../../core/models/user';
import { UsersService } from '../../../core/users/users';

export type UserFormDialogData =
  | { mode: 'create' }
  | { mode: 'edit'; user: User };

@Component({
  selector: 'app-user-form-dialog',
  imports: [
    FormsModule,
    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    DialogCloseDirective,
    InputGroupComponent,
    LabelComponent,
    BaseInputDirective,
    BaseButtonDirective,
    StrokedButtonDirective,
  ],
  templateUrl: './user-form-dialog.html',
})
export class UserFormDialog {
  private readonly context = inject<DialogContext<UserFormDialogData, boolean>>(DialogContext);
  private readonly usersService = inject(UsersService);

  protected readonly isEdit = this.context.data?.mode === 'edit';
  protected readonly roles: UserRole[] = ['Admin', 'Editor', 'Viewer'];
  protected readonly statuses: UserStatus[] = ['Active', 'Inactive'];

  name = this.isEdit && this.context.data?.mode === 'edit' ? this.context.data.user.name : '';
  email = this.isEdit && this.context.data?.mode === 'edit' ? this.context.data.user.email : '';
  role: UserRole =
    this.isEdit && this.context.data?.mode === 'edit' ? this.context.data.user.role : 'Viewer';
  status: UserStatus =
    this.isEdit && this.context.data?.mode === 'edit' ? this.context.data.user.status : 'Active';

  save(): void {
    const value: UserFormValue = {
      name: this.name.trim() || 'New User',
      email: this.email.trim() || 'user@example.com',
      role: this.role,
      status: this.status,
    };

    if (this.context.data?.mode === 'edit') {
      this.usersService.update(this.context.data.user.id, value);
    } else {
      this.usersService.add(value);
    }

    this.context.close(true);
  }
}
