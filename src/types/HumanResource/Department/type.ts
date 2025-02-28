import { BaseType } from '@/types/BaseType';

export type Department = BaseType & {
  departmentName: string;
  managerId: string;
  location: string;
};

export type DepartmentExt = Department & {
  managerName: string;
};
