/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from '@/lib/axiosClient';
import { useQuery } from '@tanstack/react-query';

const userPermission = async (): Promise<string[]> => {
  const res = await axiosClient.get('Permission/UserPermission').then((res: any) => {
    return res.data;
  });

  return res.data.permissions;
};

export function useUserPermission({ enabled }: { enabled: boolean }) {
  return useQuery({
    queryKey: ['userPermissions'],
    queryFn: userPermission,
    enabled, // Query hanya berjalan jika enabled = true
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
