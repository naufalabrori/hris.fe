'use client';
import { CreatePermissionForm } from '@/components/modules/Dashboard/MasterData/Permission/CreateForm';
import { PermissionDataTable } from '@/components/modules/Dashboard/MasterData/Permission/DataTable';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';

export default function PermissionPage() {
  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <ProtectedComponent permission="CREATE.PERMISSION">
        <CreatePermissionForm />
      </ProtectedComponent>
      <PermissionDataTable />
    </div>
  );
}
