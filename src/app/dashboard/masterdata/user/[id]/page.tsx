'use client';
import { NotPermitted } from '@/components/common/NotPermitted';
import { UserRoleDataTable } from '@/components/modules/Dashboard/MasterData/User/UserRole/DataTable';
import { Button } from '@/components/ui/button';
import { usePermissionStore } from '@/store/permissionStore';
import { useRouter } from 'next/navigation';

export default function UserRolePage({ params }: { params: { id: string } }) {
  const { hasPermission } = usePermissionStore();
  const router = useRouter();

  return hasPermission('UPDATE.USER') ? (
    <div className="bg-white p-4 rounded-md shadow-lg">
      {/* <ProtectedComponent permission="CREATE.USER">
        <CreateUserForm />
      </ProtectedComponent> */}
      <UserRoleDataTable userId={params.id} />
      <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={() => router.back()}>
        Back
      </Button>
    </div>
  ) : (
    <NotPermitted />
  );
}
