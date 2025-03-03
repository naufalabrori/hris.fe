/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { PaginationParams } from '@/types/PaginationType';
import { Training } from '@/types/HumanResource/Training/type';

export type TrainingResponse = Training & {
  data: Training[];
  totalData: number;
};

export type TrainingParams = Training & PaginationParams;

async function getTraining<T>(params: TrainingParams): Promise<T> {
  const res = await axiosClient.get('/Training', { params }).then((res: any) => {
    return {
      data: res.data.data.data,
      totalData: res.data.data.totalData,
    };
  });

  return res;
}

export function useListTraining<T extends TrainingResponse>(params: TrainingParams) {
  return useQuery<T>({
    queryKey: ['get-list-training', JSON.stringify(params)],
    queryFn: () => getTraining(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
