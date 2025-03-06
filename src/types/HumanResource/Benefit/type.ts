import { BaseType } from '@/types/BaseType';

export type Benefit = BaseType & {
  employeeId: string;
  benefitType: string;
  startDate: Date;
  endDate: Date;
  details: string;
};
