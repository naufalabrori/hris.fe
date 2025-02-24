/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';

const deletePermission = async (id: string) => {
  const res = await axiosClient.delete(`/Permission/${id}`).then((res: any) => {
    return res.data;
  });

  return res.data;
};

export function useDeletePermission() {
  return useMutation({
    mutationFn: (id: string) => deletePermission(id),
  });
}
