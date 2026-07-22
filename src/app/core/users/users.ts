import { Injectable, signal } from '@angular/core';
import { User, UserFormValue } from '../models/user';

const seedUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    email: 'sarah@example.com',
    role: 'Admin',
    status: 'Active',
    initials: 'SM',
  },
  {
    id: '2',
    name: 'James Carter',
    email: 'james@example.com',
    role: 'Editor',
    status: 'Active',
    initials: 'JC',
  },
  {
    id: '3',
    name: 'Priya Patel',
    email: 'priya@example.com',
    role: 'Viewer',
    status: 'Inactive',
    initials: 'PP',
  },
  {
    id: '4',
    name: 'Noah Kim',
    email: 'noah@example.com',
    role: 'Editor',
    status: 'Active',
    initials: 'NK',
  },
  {
    id: '5',
    name: 'Elena Rossi',
    email: 'elena@example.com',
    role: 'Viewer',
    status: 'Active',
    initials: 'ER',
  },
];

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly _users = signal<User[]>(seedUsers);
  readonly users = this._users.asReadonly();

  add(value: UserFormValue): void {
    const user: User = {
      id: crypto.randomUUID(),
      ...value,
      initials: this.toInitials(value.name),
    };
    this._users.update((users) => [user, ...users]);
  }

  update(id: string, value: UserFormValue): void {
    this._users.update((users) =>
      users.map((user) =>
        user.id === id
          ? { ...user, ...value, initials: this.toInitials(value.name) }
          : user
      )
    );
  }

  remove(id: string): void {
    this._users.update((users) => users.filter((user) => user.id !== id));
  }

  private toInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }
}
