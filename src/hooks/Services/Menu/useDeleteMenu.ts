/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from '@/lib/axiosClient';
import { useMutation } from '@tanstack/react-query';

const deleteMenu = async (id: string) => {
  const res = await axiosClient.delete(`/Menu/${id}`).then((res: any) => {
    return res.data;
  });

  return res.data;
};

export function useDeleteMenu() {
  return useMutation({
    mutationFn: (id: string) => deleteMenu(id),
  });
}
