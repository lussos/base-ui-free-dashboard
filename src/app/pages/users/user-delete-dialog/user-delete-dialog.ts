import { Component, inject } from '@angular/core';
import {
  BaseButtonDirective,
  DialogBodyComponent,
  DialogCloseDirective,
  DialogComponent,
  DialogFooterComponent,
  DialogHeaderComponent,
  StrokedButtonDirective,
} from 'Base';
import { DialogContext } from '../../../components/dialog/dialog-context';
import { User } from '../../../core/models/user';
import { UsersService } from '../../../core/users/users';

@Component({
  selector: 'app-user-delete-dialog',
  imports: [
    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    DialogCloseDirective,
    BaseButtonDirective,
    StrokedButtonDirective,
  ],
  templateUrl: './user-delete-dialog.html',
})
export class UserDeleteDialog {
  private readonly context = inject<DialogContext<{ user: User }, boolean>>(DialogContext);
  private readonly usersService = inject(UsersService);

  protected readonly user = this.context.data!.user;

  confirm(): void {
    this.usersService.remove(this.user.id);
    this.context.close(true);
  }
}
