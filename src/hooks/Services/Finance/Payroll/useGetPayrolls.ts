/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { PayrollExt } from '@/types/Finance/Payroll/type';

export type PayrollResponse = PayrollExt & {
  data: PayrollExt[];
  totalData: number;
};

export type PayrollParams = PayrollExt & PaginationParams;

async function getPayroll<T>(params: PayrollParams): Promise<T> {
  const res = await axiosClient.get('/Payroll', { params }).then((res: any) => {
    return {
      data: res.data.data.data,
      totalData: res.data.data.totalData,
    };
  });

  return res;
}

export function useListPayroll<T extends PayrollResponse>(params: PayrollParams) {
  return useQuery<T>({
    queryKey: ['get-list-payroll', JSON.stringify(params)],
    queryFn: () => getPayroll(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
