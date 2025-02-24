/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { Role } from '@/types/Role/type';

const createUpdateRole = async (data: Role, id?: number) => {
  if (id) {
    const res = await axiosClient.put(`/Role/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/Role', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdateRole(id?: number) {
  return useMutation({
    mutationFn: (data: any) => createUpdateRole(data, id),
  });
}
