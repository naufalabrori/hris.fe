/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { UserRole } from '@/types/MasterData/UserRole/type';

const createUpdateUserRole = async (data: UserRole, id?: string) => {
  if (id) {
    const res = await axiosClient.put(`/UserRole/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/UserRole', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdateUserRole(id?: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdateUserRole(data, id),
  });
}
