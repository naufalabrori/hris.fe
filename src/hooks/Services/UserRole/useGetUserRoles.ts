/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { UserRole } from '@/types/UserRole/type';

export type UserRoleResponse = UserRole & {
  data: UserRole[];
  totalData: number;
};

export type UserRoleParams = UserRole & PaginationParams;

async function getUserRole<T>(params: UserRoleParams): Promise<T> {
  const res = await axiosClient.get('/UserRole', { params }).then((res: any) => {
    return {
      data: res.data.data.data,
      totalData: res.data.data.totalData,
    };
  });

  return res;
}

export function useListUserRole<T extends UserRoleResponse>(params: UserRoleParams) {
  return useQuery<T>({
    queryKey: ['get-list-user-role', JSON.stringify(params)],
    queryFn: () => getUserRole(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
