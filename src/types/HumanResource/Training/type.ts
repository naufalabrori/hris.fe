import { BaseType } from '@/types/BaseType';

export type Training = BaseType & {
  trainingName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  trainer: string;
};
