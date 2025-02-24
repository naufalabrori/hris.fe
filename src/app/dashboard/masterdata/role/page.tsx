'use client';

import { CreateRoleForm } from '@/components/modules/Dashboard/MasterData/Role/CreateForm';
import { RoleDataTable } from '@/components/modules/Dashboard/MasterData/Role/DataTable';

export default function PermissionPage() {
  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <CreateRoleForm />
      <RoleDataTable />
    </div>
  );
}
