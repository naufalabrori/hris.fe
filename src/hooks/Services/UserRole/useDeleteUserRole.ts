/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';

const deleteUserRole = async (id: string) => {
  const res = await axiosClient.delete(`/UserRole/${id}`).then((res: any) => {
    return res.data;
  });

  return res.data;
};

export function useDeleteUserRole() {
  return useMutation({
    mutationFn: (id: string) => deleteUserRole(id),
  });
}
