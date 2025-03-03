'use client';
import { usePermissionStore } from '@/store/permissionStore';
import { NotPermitted } from '@/components/common/NotPermitted';
import { EmployeeDataTable } from '@/components/modules/Dashboard/HR/Employee/DataTable';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { CreateEmployeeForm } from '@/components/modules/Dashboard/HR/Employee/CreateForm';

export default function EmployeePage() {
  const { hasPermission } = usePermissionStore();

  return hasPermission('VIEW.EMPLOYEE') ? (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <ProtectedComponent permission="CREATE.EMPLOYEE">
        <CreateEmployeeForm />
      </ProtectedComponent>
      <EmployeeDataTable />
    </div>
  ) : (
    <NotPermitted />
  );
}
