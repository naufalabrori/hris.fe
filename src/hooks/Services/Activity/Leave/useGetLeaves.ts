/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { Leave } from '@/types/Activity/Leave/type';

export type LeaveResponse = Leave & {
  data: Leave[];
  totalData: number;
};

export type LeaveParams = Leave & PaginationParams;

async function getLeave<T>(params: LeaveParams): Promise<T> {
  const res = await axiosClient.get('/Leave', { params }).then((res: any) => {
    return {
      data: res.data.data.data,
      totalData: res.data.data.totalData,
    };
  });

  return res;
}

export function useListLeave<T extends LeaveResponse>(params: LeaveParams) {
  return useQuery<T>({
    queryKey: ['get-list-leave', JSON.stringify(params)],
    queryFn: () => getLeave(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
