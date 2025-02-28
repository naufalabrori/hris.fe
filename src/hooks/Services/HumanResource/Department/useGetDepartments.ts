/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { DepartmentExt } from '@/types/HumanResource/Department/type';

export type DepartmentResponse = DepartmentExt & {
  data: DepartmentExt[];
  totalData: number;
};

export type DepartmentParams = DepartmentExt & PaginationParams;

async function getDepartment<T>(params: DepartmentParams): Promise<T> {
  const res = await axiosClient.get('/Department', { params }).then((res: any) => {
    return {
      data: res.data.data.data,
      totalData: res.data.data.totalData,
    };
  });

  return res;
}

export function useListDepartment<T extends DepartmentResponse>(params: DepartmentParams) {
  return useQuery<T>({
    queryKey: ['get-list-department', JSON.stringify(params)],
    queryFn: () => getDepartment(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
