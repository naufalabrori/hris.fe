/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { Permission } from '@/types/Permission/type';

const createUpdatePermission = async (data: Permission, id?: string) => {
  if (id) {
    const res = await axiosClient.put(`/Permission/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/Permission', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdatePermission(id?: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdatePermission(data, id),
  });
}
