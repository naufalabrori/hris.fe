import { BaseType } from '../../BaseType';

export type Permission = BaseType & {
  permissionName: string;
  action: string;
  resource: string;
};
