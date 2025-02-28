/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Department } from '@/types/HumanResource/Department/type';
import { useMemo } from 'react';
import { formatDateTime } from '@/lib/functions';
import { UpdateDepartmentForm } from './UpdateForm';
import { usePermissionStore } from '@/store/permissionStore';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { Badge } from '@/components/ui/badge';

interface ColumnDepartment {
  currentPage: number;
  perPage: number;
}

export const DepartmentColumns = ({ currentPage, perPage }: ColumnDepartment) => {
  const { hasPermission } = usePermissionStore();

  const columns = useMemo<ColumnDef<any, Department>[]>(
    () => [
      {
        id: 'numbers',
        header: 'No',
        cell: (info) => {
          return (
            <div className="text-center">{perPage * (currentPage - 1) + (info?.row.index + 1)}</div>
          );
        },
      },
      {
        accessorKey: 'departmentName',
        header: () => 'Department Name',
      },
      {
        accessorKey: 'location',
        header: () => 'Location',
      },
      {
        accessorKey: 'managerName',
        header: () => 'Manager Name',
      },
      {
        accessorKey: 'isActive',
        header: 'Is Active',
        cell: ({ row }) => {
          const status = row.getValue('isActive');
          return (
            <Badge
              className={
                !status ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }
            >
              {status ? 'Active' : 'In Active'}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'createdByName',
        header: () => 'Created By',
      },
      {
        accessorKey: 'createdDate',
        header: () => 'Created Date',
        cell: ({ row }) => formatDateTime(row.getValue('createdDate')),
      },
      {
        accessorKey: 'modifiedByName',
        header: () => 'Modified By',
      },
      {
        accessorKey: 'modifiedDate',
        header: () => 'Modified Date',
        cell: ({ row }) => formatDateTime(row.getValue('modifiedDate')),
      },
      ...(hasPermission('UPDATE.DEPARTMENT')
        ? [
            {
              id: 'actions',
              header: 'Action',
              cell: (info: any) => {
                const { id, departmentName, managerId, location, isActive } = info.row.original;

                const masterData = {
                  id,
                  departmentName,
                  managerId,
                  location,
                  isActive,
                };
                return (
                  <>
                    <ProtectedComponent permission="UPDATE.DEPARTMENT">
                      <UpdateDepartmentForm data={masterData} />
                    </ProtectedComponent>
                  </>
                );
              },
            },
          ]
        : []),
    ],
    [currentPage, perPage, hasPermission]
  );

  return columns;
};
