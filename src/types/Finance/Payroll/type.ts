import { BaseType } from '@/types/BaseType';

export type Payroll = BaseType & {
  employeeId: string;
  payPeriodStartDate: Date;
  payPeriodEndDate: Date;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  paymentDate: Date;
};

export type PayrollExt = Payroll & {
  employeeName: string;
};
