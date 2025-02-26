/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { User } from '@/types/User/type';

const createUpdateUser = async (data: User, id?: string) => {
  if (id) {
    const res = await axiosClient.put(`/User/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/User', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdateUser(id?: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdateUser(data, id),
  });
}
