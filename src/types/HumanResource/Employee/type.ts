import { BaseType } from '../../BaseType';

export type Employee = BaseType & {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  email: string;
  phoneNumber: string;
  address: string;
  hireDate: Date;
  jobTitleId: string;
  departmentId: string;
  managerId: string;
  employmentStatus: string;
  salary: number;
};

export type EmployeeExt = Employee & {
  departmentName: string;
  jobName: string;
  managerName: string;
};
