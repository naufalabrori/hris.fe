/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { Benefit } from '@/types/HumanResource/Benefit/type';

export type BenefitResponse = Benefit & {
  data: Benefit[];
  totalData: number;
};

export type BenefitParams = Benefit & PaginationParams;

async function getBenefit<T>(params: BenefitParams): Promise<T> {
  const res = await axiosClient.get('/Benefit', { params }).then((res: any) => {
    return {
      data: res.data.data.data,
      totalData: res.data.data.totalData,
    };
  });

  return res;
}

export function useListBenefit<T extends BenefitResponse>(params: BenefitParams) {
  return useQuery<T>({
    queryKey: ['get-list-benefit', JSON.stringify(params)],
    queryFn: () => getBenefit(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
