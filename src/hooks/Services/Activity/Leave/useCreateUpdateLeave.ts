/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { Leave } from '@/types/Activity/Leave/type';

const createUpdateLeave = async (data: Leave, id?: string) => {
  if (id) {
    const res = await axiosClient.put(`/Leave/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/Leave', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdateLeave(id?: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdateLeave(data, id),
  });
}
