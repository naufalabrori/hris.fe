/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { EmployeeExt } from '@/types/HumanResource/Employee/type';

export type EmployeeResponse = EmployeeExt & {};

async function getEmployee<T>(id?: string): Promise<T> {
  return await axiosClient.get(`/Employee/${id}`).then((res: any) => {
    return res.data.data;
  });
}

export function useGetEmployeeById<T extends EmployeeResponse>(id?: string) {
  const queryKey = ['get-employee-by-id', id];

  return useQuery<T>({
    queryKey,
    queryFn: () => getEmployee(id),
    enabled: !!id,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
