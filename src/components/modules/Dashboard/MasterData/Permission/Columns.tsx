/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Permission } from '@/types/Permission/type';
import { useMemo } from 'react';
import { formatDateTime } from '@/lib/functions';
import { usePermissionStore } from '@/store/permissionStore';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { UpdatePermissionForm } from './UpdateForm';

interface ColumnPermission {
  currentPage: number;
  perPage: number;
}

export const PermissionColumns = ({ currentPage, perPage }: ColumnPermission) => {
  const { hasPermission } = usePermissionStore();

  const columns = useMemo<ColumnDef<any, Permission>[]>(
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
        accessorKey: 'permissionName',
        header: () => 'Permission Name',
      },
      {
        accessorKey: 'resource',
        header: () => 'Menu',
      },
      {
        accessorKey: 'action',
        header: () => 'Operation',
      },
      {
        accessorKey: 'createdDate',
        header: () => 'Created Date',
        cell: ({ row }) => formatDateTime(row.getValue('createdDate')),
      },
      {
        accessorKey: 'modifiedDate',
        header: () => 'Modified Date',
        cell: ({ row }) => formatDateTime(row.getValue('modifiedDate')),
      },
      ...(hasPermission('UPDATE.PERMISSION')
        ? [
            {
              id: 'actions',
              header: 'Action',
              cell: (info: any) => {
                const { id, permissionName, resource, action } = info.row.original;

                const masterData = {
                  id,
                  permissionName,
                  resource,
                  action,
                };
                return (
                  <>
                    <ProtectedComponent permission="UPDATE.PERMISSION">
                      <UpdatePermissionForm data={masterData} />
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
