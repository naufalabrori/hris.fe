'use client';
import { usePermissionStore } from '@/store/permissionStore';
import { TrainingDataTable } from '@/components/modules/Dashboard/HR/Training/DataTable';
import { NotPermitted } from '@/components/common/NotPermitted';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { CreateTrainingForm } from '@/components/modules/Dashboard/HR/Training/CreateForm';
import useMenuStore from '@/hooks/useMenuStore';
import { useEffect } from 'react';

export default function TrainingPage() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    const breadcrumb = [
      {
        path: '/dashboard/hr/training',
        name: 'Training',
      },
    ];

    setMenu(breadcrumb);
  }, [setMenu]);

  const { hasPermission } = usePermissionStore();

  return hasPermission('VIEW.TRAINING') ? (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <ProtectedComponent permission="CREATE.TRAINING">
        <CreateTrainingForm />
      </ProtectedComponent>
      <TrainingDataTable />
    </div>
  ) : (
    <NotPermitted />
  );
}
