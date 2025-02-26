'use client';
import { NotPermitted } from '@/components/common/NotPermitted';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { CreateMenuForm } from '@/components/modules/Dashboard/MasterData/Menu/CreateForm';
import { MenuDataTable } from '@/components/modules/Dashboard/MasterData/Menu/DataTable';
import { usePermissionStore } from '@/store/permissionStore';

export default function MenuPage() {
  const { hasPermission } = usePermissionStore();

  return hasPermission('VIEW.MENU') ? (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <ProtectedComponent permission="CREATE.MENU">
        <CreateMenuForm />
      </ProtectedComponent>
      <MenuDataTable />
    </div>
  ) : (
    <NotPermitted />
  );
}
