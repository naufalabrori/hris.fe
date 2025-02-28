/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { EmployeeExt } from '@/types/HumanResource/Employee/type';

export type EmployeeResponse = EmployeeExt & {
  data: EmployeeExt[];
  totalData: number;
};

export type EmployeeParams = EmployeeExt & PaginationParams;

async function getEmployee<T>(params: EmployeeParams): Promise<T> {
  const res = await axiosClient.get('/Employee', { params }).then((res: any) => {
    return {
      data: res.data.data.data,
      totalData: res.data.data.totalData,
    };
  });

  return res;
}

export function useListEmployee<T extends EmployeeResponse>(params: EmployeeParams) {
  return useQuery<T>({
    queryKey: ['get-list-employee', JSON.stringify(params)],
    queryFn: () => getEmployee(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
