'use client';
import { NotPermitted } from '@/components/common/NotPermitted';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { CreateUserForm } from '@/components/modules/Dashboard/MasterData/User/CreateForm';
import { UserDataTable } from '@/components/modules/Dashboard/MasterData/User/DataTable';
import { usePermissionStore } from '@/store/permissionStore';

export default function UserPage() {
  const { hasPermission } = usePermissionStore();

  return hasPermission('VIEW.USER') ? (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <ProtectedComponent permission="CREATE.USER">
        <CreateUserForm />
      </ProtectedComponent>
      <UserDataTable />
    </div>
  ) : (
    <NotPermitted />
  );
}
