/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { JobTitle } from '@/types/HumanResource/JobTitle/type';
import { useMemo } from 'react';
import { formatDateTime, formatRupiah } from '@/lib/functions';
import { UpdateJobTitleForm } from './UpdateForm';
import { usePermissionStore } from '@/store/permissionStore';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { Badge } from '@/components/ui/badge';

interface ColumnJobTitle {
  currentPage: number;
  perPage: number;
}

export const JobTitleColumns = ({ currentPage, perPage }: ColumnJobTitle) => {
  const { hasPermission } = usePermissionStore();

  const columns = useMemo<ColumnDef<any, JobTitle>[]>(
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
        accessorKey: 'title',
        header: () => 'Job Name',
      },
      {
        accessorKey: 'description',
        header: () => 'Description',
      },
      {
        accessorKey: 'minSalary',
        header: () => 'Minimum Salary',
        cell: ({ row }) => formatRupiah(row.getValue('minSalary')),
      },
      {
        accessorKey: 'maxSalary',
        header: () => 'Maximum Salary',
        cell: ({ row }) => formatRupiah(row.getValue('maxSalary')),
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
      ...(hasPermission('UPDATE.JOB_TITLE')
        ? [
            {
              id: 'actions',
              header: 'Action',
              cell: (info: any) => {
                const { id, title, description, minSalary, maxSalary, isActive } =
                  info.row.original;

                const masterData = {
                  id,
                  title,
                  description,
                  minSalary,
                  maxSalary,
                  isActive,
                };
                return (
                  <>
                    <ProtectedComponent permission="UPDATE.JOB_TITLE">
                      <UpdateJobTitleForm data={masterData} />
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
