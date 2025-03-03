/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { Training } from '@/types/HumanResource/Training/type';

const createUpdateTraining = async (data: Training, id?: string) => {
  if (id) {
    const res = await axiosClient.put(`/Training/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/Training', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdateTraining(id?: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdateTraining(data, id),
  });
}
