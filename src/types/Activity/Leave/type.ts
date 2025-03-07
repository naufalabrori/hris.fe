import { BaseType } from '@/types/BaseType';

export type Leave = BaseType & {
  employeeId: string;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  status: string;
};
