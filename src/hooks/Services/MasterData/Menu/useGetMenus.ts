/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { Menu } from '@/types/MasterData/Menu/type';

export type MenuResponse = Menu & {
  data: Menu[];
  totalData: number;
};

export type MenuParams = Menu & PaginationParams;

async function getMenu<T>(params: MenuParams): Promise<T> {
  const res = await axiosClient.get('/Menu', { params }).then((res: any) => {
    return {
      data: res.data.data.data,
      totalData: res.data.data.totalData,
    };
  });

  return res;
}

export function useListMenu<T extends MenuResponse>(params: MenuParams) {
  return useQuery<T>({
    queryKey: ['get-list-menu', JSON.stringify(params)],
    queryFn: () => getMenu(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
