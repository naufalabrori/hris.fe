/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';

const deleteRolePermission = async (id: string) => {
  const res = await axiosClient.delete(`/RolePermission/${id}`).then((res: any) => {
    return res.data;
  });

  return res.data;
};

export function useDeleteRolePermission() {
  return useMutation({
    mutationFn: (id: string) => deleteRolePermission(id),
  });
}
