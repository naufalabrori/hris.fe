/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { Payroll } from '@/types/Finance/Payroll/type';

const createUpdatePayroll = async (data: Payroll, id?: string) => {
  if (id) {
    const res = await axiosClient.put(`/Payroll/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/Payroll', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdatePayroll(id?: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdatePayroll(data, id),
  });
}
