/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { Benefit } from '@/types/HumanResource/Benefit/type';

const createUpdateBenefit = async (data: Benefit, id?: string) => {
  if (id) {
    const res = await axiosClient.put(`/Benefit/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/Benefit', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdateBenefit(id?: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdateBenefit(data, id),
  });
}
