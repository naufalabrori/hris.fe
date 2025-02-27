/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { JobTitle } from '@/types/HumanResource/JobTitle/type';

const createUpdateJobTitle = async (data: JobTitle, id?: string) => {
  if (id) {
    const res = await axiosClient.put(`/JobTitle/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/JobTitle', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdateJobTitle(id?: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdateJobTitle(data, id),
  });
}
