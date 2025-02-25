'use client';

import { CreateRoleForm } from '@/components/modules/Dashboard/MasterData/Role/CreateForm';
import { RoleDataTable } from '@/components/modules/Dashboard/MasterData/Role/DataTable';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';

export default function PermissionPage() {
  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <ProtectedComponent permission="CREATE.ROLE">
        <CreateRoleForm />
      </ProtectedComponent>
      <RoleDataTable />
    </div>
  );
}
