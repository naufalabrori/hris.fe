'use client';
import { NotPermitted } from '@/components/common/NotPermitted';
import { CreateRolePermissionForm } from '@/components/modules/Dashboard/MasterData/Role/RolePermission/CreateForm';
import { RolePermissionDataTable } from '@/components/modules/Dashboard/MasterData/Role/RolePermission/DataTable';
import { RoleForm } from '@/components/modules/Dashboard/MasterData/Role/RolePermission/RoleForm';
import { Button } from '@/components/ui/button';
import useMenuStore from '@/hooks/useMenuStore';
import { usePermissionStore } from '@/store/permissionStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    const breadcrumb = [
      {
        path: '/dashboard/masterdata/role',
        name: 'Role',
      },
      {
        path: `/dashboard/masterdata/role/${params.id}`,
        name: 'View Role',
      },
    ];

    setMenu(breadcrumb);
  }, [setMenu, params.id]);

  const { hasPermission } = usePermissionStore();
  const router = useRouter();

  return hasPermission('VIEW.ROLE') ? (
    <>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <p className="font-semibold text-xl mb-3">Role</p>
        <RoleForm id={params.id} />
      </div>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <p className="font-semibold text-lg mb-3">Role Permission</p>
        <CreateRolePermissionForm roleId={params.id} />
        <RolePermissionDataTable id={params.id} />
        <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </>
  ) : (
    <NotPermitted />
  );
}
