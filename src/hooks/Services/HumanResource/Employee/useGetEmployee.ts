/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { Employee } from '@/types/HumanResource/Employee/type';

export type EmployeeResponse = Employee & {
  data: Employee[];
  totalData: number;
};

export type EmployeeParams = Employee & PaginationParams;

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
