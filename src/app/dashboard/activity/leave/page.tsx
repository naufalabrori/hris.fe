'use client';
import { useEffect } from 'react';
import { usePermissionStore } from '@/store/permissionStore';
import useMenuStore from '@/hooks/useMenuStore';
import { NotPermitted } from '@/components/common/NotPermitted';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { CreateLeaveForm } from '@/components/modules/Dashboard/Activity/Leave/CreateForm';
import { LeaveDataTable } from '@/components/modules/Dashboard/Activity/Leave/DataTable';

export default function LeavePage() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    const breadcrumb = [
      {
        path: '/dashboard/activity/leave',
        name: 'Leave',
      },
    ];

    setMenu(breadcrumb);
  }, [setMenu]);

  const { hasPermission } = usePermissionStore();

  return hasPermission('VIEW.LEAVE') ? (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <ProtectedComponent permission="CREATE.LEAVE">
        <CreateLeaveForm />
      </ProtectedComponent>
      <LeaveDataTable />
    </div>
  ) : (
    <NotPermitted />
  );
}
