'use client';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { Button } from '@/components/ui/button';
import { useUserPermission } from '@/hooks/Services/Permission/useGetUserPermission';
import { PERMISSION_COOKIES_KEY } from '@/lib/constant';
import { usePermissionStore } from '@/store/permissionStore';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Dashboard() {
  const [isPermissionExist, setIsPermissionExist] = useState(false);
  const { data: permissions } = useUserPermission({ enabled: isPermissionExist });

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
      <p>Dashboard</p>
      <ProtectedComponent permission="CREATE.USER">
        <Button>click me</Button>
      </ProtectedComponent>
    </div>
  );
}
