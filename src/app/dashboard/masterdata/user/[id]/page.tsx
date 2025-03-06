'use client';
import { NotPermitted } from '@/components/common/NotPermitted';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { CreateUserRoleForm } from '@/components/modules/Dashboard/MasterData/User/UserRole/CreateForm';
import { UserRoleDataTable } from '@/components/modules/Dashboard/MasterData/User/UserRole/DataTable';
import { UserForm } from '@/components/modules/Dashboard/MasterData/User/UserRole/UserForm';
import { Button } from '@/components/ui/button';
import useMenuStore from '@/hooks/useMenuStore';
import { usePermissionStore } from '@/store/permissionStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UserRolePage({ params }: { params: { id: string } }) {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    const breadcrumb = [
      {
        path: '/dashboard/masterdata/user',
        name: 'User',
      },
      {
        path: `/dashboard/masterdata/user/${params.id}`,
        name: 'View User',
      },
    ];

    setMenu(breadcrumb);
  }, [setMenu, params.id]);

  const { hasPermission } = usePermissionStore();
  const router = useRouter();

  return hasPermission('UPDATE.USER') ? (
    <>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <p className="font-semibold text-xl mb-3">User</p>
        <UserForm id={params.id} />
      </div>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <p className="font-semibold text-lg mb-3">User Role</p>
        <ProtectedComponent permission="UPDATE.USER">
          <CreateUserRoleForm userId={params.id} />
        </ProtectedComponent>
        <UserRoleDataTable userId={params.id} />
        <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </>
  ) : (
    <NotPermitted />
  );
}
