import { BaseType } from '../../BaseType';

export type RolePermission = BaseType & {
  roleId: string;
  permissionId: string;
};

export type RolePermissionExt = RolePermission & {
  permissionName: string;
  action: string;
  resource: string;
};
