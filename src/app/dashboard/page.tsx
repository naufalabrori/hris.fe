'use client';
import { useUserPermission } from '@/hooks/Services/MasterData/Permission/useGetUserPermission';
import { PERMISSION_COOKIES_KEY } from '@/lib/constant';
import { useAuthStore } from '@/store/authStore';
import { usePermissionStore } from '@/store/permissionStore';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Dashboard() {
  const [isPermissionExist, setIsPermissionExist] = useState(false);
  const { data: permissions } = useUserPermission({ enabled: isPermissionExist });

  const { user } = useAuthStore();

  const { setPermissions } = usePermissionStore();

  useEffect(() => {
    const permission = cookies.get(PERMISSION_COOKIES_KEY);

    if (!permission) {
      setIsPermissionExist(true);
    }
  }, []);

  useEffect(() => {
    if (permissions) {
      setPermissions(permissions);
    }
  }, [permissions, setPermissions]);

  return (
    <div>
      <p>Welcome {user?.username}</p>
    </div>
  );
}
