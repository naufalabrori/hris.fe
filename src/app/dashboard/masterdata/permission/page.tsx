'use client';
import { CreatePermissionForm } from '@/components/modules/Dashboard/MasterData/Permission/CreateForm';
import { PermissionDataTable } from '@/components/modules/Dashboard/MasterData/Permission/DataTable';

export default function PermissionPage() {
  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <CreatePermissionForm />
      <PermissionDataTable />
    </div>
  );
}
