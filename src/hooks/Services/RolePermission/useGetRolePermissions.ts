/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { RolePermissionExt } from '@/types/RolePermission/type';

export type RolePermissionResponse = RolePermissionExt & {
  data: RolePermissionExt[];
  totalData: number;
};

export type RolePermissionParams = RolePermissionExt & PaginationParams;

async function getRolePermission<T>(params: RolePermissionParams): Promise<T> {
  const res = await axiosClient.get('/RolePermission', { params }).then((res: any) => {
    return {
      data: res.data.data.data,
      totalData: res.data.data.totalData,
    };
  });

  return res;
}

export function useListRolePermission<T extends RolePermissionResponse>(
  params: RolePermissionParams
) {
  return useQuery<T>({
    queryKey: ['get-list-role-permission', JSON.stringify(params)],
    queryFn: () => getRolePermission(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
