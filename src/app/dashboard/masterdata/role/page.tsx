'use client';
import { CreateRoleForm } from '@/components/modules/Dashboard/MasterData/Role/CreateForm';
import { RoleDataTable } from '@/components/modules/Dashboard/MasterData/Role/DataTable';
import { NotPermitted } from '@/components/common/NotPermitted';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { usePermissionStore } from '@/store/permissionStore';
import useMenuStore from '@/hooks/useMenuStore';
import { useEffect } from 'react';

export default function RolePage() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    const breadcrumb = [
      {
        path: '/dashboard/masterdata/role',
        name: 'Role',
      },
    ];

    setMenu(breadcrumb);
  }, [setMenu]);

  const { hasPermission } = usePermissionStore();

  return hasPermission('VIEW.ROLE') ? (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <ProtectedComponent permission="CREATE.ROLE">
        <CreateRoleForm />
      </ProtectedComponent>
      <RoleDataTable />
    </div>
  ) : (
    <NotPermitted />
  );
}
