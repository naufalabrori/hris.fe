import { BaseType } from '@/types/BaseType';

export type JobTitle = BaseType & {
  title: string;
  description: string;
  minSalary: number;
  maxSalary: number;
};
