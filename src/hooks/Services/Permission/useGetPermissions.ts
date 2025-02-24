/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { Permission } from '@/types/Permission/type';

export type PermissionResponse = Permission & {
  data: Permission[];
  totalData: number;
};

export type PermissionParams = Permission & PaginationParams;

async function getPermission<T>(params: PermissionParams): Promise<T> {
  const res = await axiosClient.get('/Permission', { params }).then((res: any) => {
    return {
      data: res.data.data.data,
      totalData: res.data.data.totalData,
    };
  });

  return res;
}

export function useListPermission<T extends PermissionResponse>(params: PermissionParams) {
  return useQuery<T>({
    queryKey: ['get-list-permission', JSON.stringify(params)],
    queryFn: () => getPermission(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
