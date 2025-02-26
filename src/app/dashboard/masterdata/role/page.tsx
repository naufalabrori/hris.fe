'use client';

import { CreateRoleForm } from '@/components/modules/Dashboard/MasterData/Role/CreateForm';
import { RoleDataTable } from '@/components/modules/Dashboard/MasterData/Role/DataTable';
import { NotPermitted } from '@/components/common/NotPermitted';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { usePermissionStore } from '@/store/permissionStore';

export default function PermissionPage() {
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
