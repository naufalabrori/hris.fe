/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { Role } from '@/types/Role/type';

export type RoleResponse = Role & {};

async function getRole<T>(id?: string): Promise<T> {
  return await axiosClient.get(`/Role/${id}`).then((res: any) => {
    return res.data.data;
  });
}

export function useGetRoleById<T extends RoleResponse>(id?: string) {
  const queryKey = ['get-role-by-id', id];

  return useQuery<T>({
    queryKey,
    queryFn: () => getRole(id),
    enabled: !!id,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
