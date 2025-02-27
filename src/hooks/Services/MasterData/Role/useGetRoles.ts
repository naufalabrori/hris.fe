/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { Role } from '@/types/MasterData/Role/type';

export type RoleResponse = Role & {
  data: Role[];
  totalData: number;
};

export type RoleParams = Role & PaginationParams;

async function getRole<T>(params: Role): Promise<T> {
  const res = await axiosClient.get('/Role', { params }).then((res: any) => {
    return {
      data: res.data.data.data,
      totalData: res.data.data.totalData,
    };
  });

  return res;
}

export function useListRole<T extends RoleResponse>(params: RoleParams) {
  return useQuery<T>({
    queryKey: ['get-list-role', JSON.stringify(params)],
    queryFn: () => getRole(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
