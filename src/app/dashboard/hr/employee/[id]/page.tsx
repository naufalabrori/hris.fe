'use client';
import { NotPermitted } from '@/components/common/NotPermitted';
import { EmployeeForm } from '@/components/modules/Dashboard/HR/Employee/EmployeeForm';
import { Button } from '@/components/ui/button';
import { usePermissionStore } from '@/store/permissionStore';
import { useRouter } from 'next/navigation';

export default function EmployeeByIdPage({ params }: { params: { id: string } }) {
  const { hasPermission } = usePermissionStore();
  const router = useRouter();
  return hasPermission('VIEW.EMPLOYEE') ? (
    <>
      <div className="bg-white p-4 rounded-md shadow-lg">
        <p className="font-semibold text-xl mb-3">Employee</p>
        <EmployeeForm id={params.id} />
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
