export type UserRole = 'Admin' | 'Editor' | 'Viewer';
export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl?: string;
  initials: string;
}

export type UserFormValue = Omit<User, 'id' | 'initials' | 'avatarUrl'> & {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};
