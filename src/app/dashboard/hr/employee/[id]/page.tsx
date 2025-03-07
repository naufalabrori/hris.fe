'use client';
import { NotPermitted } from '@/components/common/NotPermitted';
import { LeaveDataTable } from '@/components/modules/Dashboard/Activity/Leave/DataTable';
import { PayrollDataTable } from '@/components/modules/Dashboard/Finance/Payroll/DataTable';
import { CreateBenefitForm } from '@/components/modules/Dashboard/HR/Employee/Benefit/CreateForm';
import { BenefitDataTable } from '@/components/modules/Dashboard/HR/Employee/Benefit/DataTable';
import { EmployeeForm } from '@/components/modules/Dashboard/HR/Employee/EmployeeForm';
import { Button } from '@/components/ui/button';
import useMenuStore from '@/hooks/useMenuStore';
import { usePermissionStore } from '@/store/permissionStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EmployeeByIdPage({ params }: { params: { id: string } }) {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    const breadcrumb = [
      {
        path: '/dashboard/hr/employee',
        name: 'Employee',
      },
      {
        path: `/dashboard/hr/employee/${params.id}`,
        name: 'View Employee',
      },
    ];

    setMenu(breadcrumb);
  }, [setMenu, params.id]);

  const { hasPermission } = usePermissionStore();
  const router = useRouter();

  return hasPermission('VIEW.EMPLOYEE') ? (
    <>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <p className="font-semibold text-xl mb-3">Employee</p>
        <EmployeeForm id={params.id} />
      </div>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <p className="font-semibold text-lg mb-3">Benefit</p>
        <CreateBenefitForm employeeId={params.id} />
        <BenefitDataTable employeeId={params.id} />
      </div>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <p className="font-semibold text-lg mb-3">Leave</p>
        <LeaveDataTable employeeId={params.id} />
      </div>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <p className="font-semibold text-lg mb-3">Payroll</p>
        <PayrollDataTable employeeId={params.id} />
      </div>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </>
  ) : (
    <NotPermitted />
  );
}
