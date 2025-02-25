/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { RolePermission } from '@/types/RolePermission/type';

const createUpdateRolePermission = async (data: RolePermission, id?: string) => {
  if (id) {
    const res = await axiosClient.put(`/RolePermission/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/RolePermission', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdateRolePermission(id?: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdateRolePermission(data, id),
  });
}
