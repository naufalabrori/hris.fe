'use client';
import { usePermissionStore } from '@/store/permissionStore';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { JobTitleDataTable } from '@/components/modules/Dashboard/HR/JobTitle/DataTable';
import { NotPermitted } from '@/components/common/NotPermitted';
import { CreateJobTitleForm } from '@/components/modules/Dashboard/HR/JobTitle/CreateForm';
import useMenuStore from '@/hooks/useMenuStore';
import { useEffect } from 'react';

export default function JobTitlePage() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    const breadcrumb = [
      {
        path: '/dashboard/hr/job-title',
        name: 'Job Title',
      },
    ];

    setMenu(breadcrumb);
  }, [setMenu]);

  const { hasPermission } = usePermissionStore();

  return hasPermission('VIEW.JOB_TITLE') ? (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <ProtectedComponent permission="CREATE.JOB_TITLE">
        <CreateJobTitleForm />
      </ProtectedComponent>
      <JobTitleDataTable />
    </div>
  ) : (
    <NotPermitted />
  );
}
