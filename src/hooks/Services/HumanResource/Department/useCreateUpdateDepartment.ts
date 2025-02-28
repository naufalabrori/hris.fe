/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { Department } from '@/types/HumanResource/Department/type';

const createUpdateDepartment = async (data: Department, id?: string) => {
  if (id) {
    const res = await axiosClient.put(`/Department/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/Department', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdateDepartment(id?: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdateDepartment(data, id),
  });
}
