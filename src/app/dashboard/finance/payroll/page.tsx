'use client';
import { usePermissionStore } from '@/store/permissionStore';
import { NotPermitted } from '@/components/common/NotPermitted';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { PayrollDataTable } from '@/components/modules/Dashboard/Finance/Payroll/DataTable';
import { CreatePayrollForm } from '@/components/modules/Dashboard/Finance/Payroll/CreateForm';
import useMenuStore from '@/hooks/useMenuStore';
import { useEffect } from 'react';

export default function PayrollPage() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    const breadcrumb = [
      {
        path: '/dashboard/finance/payroll',
        name: 'Payroll',
      },
    ];

    setMenu(breadcrumb);
  }, [setMenu]);

  const { hasPermission } = usePermissionStore();

  return hasPermission('VIEW.PAYROLL') ? (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <ProtectedComponent permission="CREATE.PAYROLL">
        <CreatePayrollForm />
      </ProtectedComponent>
      <PayrollDataTable />
    </div>
  ) : (
    <NotPermitted />
  );
}
