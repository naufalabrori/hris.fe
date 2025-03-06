'use client';
import { CreatePermissionForm } from '@/components/modules/Dashboard/MasterData/Permission/CreateForm';
import { PermissionDataTable } from '@/components/modules/Dashboard/MasterData/Permission/DataTable';
import { NotPermitted } from '@/components/common/NotPermitted';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { usePermissionStore } from '@/store/permissionStore';
import useMenuStore from '@/hooks/useMenuStore';
import { useEffect } from 'react';

export default function PermissionPage() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    const breadcrumb = [
      {
        path: '/dashboard/masterdata/permission',
        name: 'Permission',
      },
    ];

    setMenu(breadcrumb);
  }, [setMenu]);

  const { hasPermission } = usePermissionStore();

  return hasPermission('VIEW.PERMISSION') ? (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <ProtectedComponent permission="CREATE.PERMISSION">
        <CreatePermissionForm />
      </ProtectedComponent>
      <PermissionDataTable />
    </div>
  ) : (
    <NotPermitted />
  );
}
