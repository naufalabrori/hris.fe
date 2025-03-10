/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { Menu } from '@/types/MasterData/Menu/type';

const createUpdateMenu = async (data: Menu, id?: string) => {
  if (id) {
    const res = await axiosClient.put(`/Menu/${id}`, data).then((res: any) => {
      return res.data;
    });

    return res.data;
  } else {
    const res = await axiosClient.post('/Menu', data).then((res: any) => {
      return res.data;
    });

    return res.data;
  }
};

export function useCreateUpdateMenu(id?: string) {
  return useMutation({
    mutationFn: (data: any) => createUpdateMenu(data, id),
  });
}
