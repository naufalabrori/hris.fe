'use client';
import { usePermissionStore } from '@/store/permissionStore';
import { NotPermitted } from '@/components/common/NotPermitted';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { DepartmentDataTable } from '@/components/modules/Dashboard/HR/Department/DataTable';
import { CreateDepartmentForm } from '@/components/modules/Dashboard/HR/Department/CreateForm';
import useMenuStore from '@/hooks/useMenuStore';
import { useEffect } from 'react';

export default function DepartmentPage() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    const breadcrumb = [
      {
        path: '/dashboard/hr/department',
        name: 'Department',
      },
    ];

    setMenu(breadcrumb);
  }, [setMenu]);

  const { hasPermission } = usePermissionStore();

  return hasPermission('VIEW.DEPARTMENT') ? (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <ProtectedComponent permission="CREATE.DEPARTMENT">
        <CreateDepartmentForm />
      </ProtectedComponent>
      <DepartmentDataTable />
    </div>
  ) : (
    <NotPermitted />
  );
}
