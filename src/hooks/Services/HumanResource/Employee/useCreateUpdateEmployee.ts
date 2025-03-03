/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { Employee } from '@/types/HumanResource/Employee/type';

const createUpdateEmployee = async (data: Employee, id?: string) => {
  if (id) {
    const res = await axiosClient.put(`/Employee/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/Employee', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdateEmployee(id?: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdateEmployee(data, id),
  });
}
