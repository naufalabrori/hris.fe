/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { JobTitle } from '@/types/HumanResource/JobTitle/type';

export type JobTitleResponse = JobTitle & {
  data: JobTitle[];
  totalData: number;
};

export type JobTitleParams = JobTitle & PaginationParams;

async function getJobTitle<T>(params: JobTitleParams): Promise<T> {
  const res = await axiosClient.get('/JobTitle', { params }).then((res: any) => {
    return {
      data: res.data.data.data,
      totalData: res.data.data.totalData,
    };
  });

  return res;
}

export function useListJobTitle<T extends JobTitleResponse>(params: JobTitleParams) {
  return useQuery<T>({
    queryKey: ['get-list-job-title', JSON.stringify(params)],
    queryFn: () => getJobTitle(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
