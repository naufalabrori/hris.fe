import { BaseType } from '../BaseType';

export type UserRole = BaseType & {
  userId: string;
  roleId: string;
  roleName: string;
};
