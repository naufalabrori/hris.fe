/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { UserRole } from '@/types/UserRole/type';
import { useMemo } from 'react';
import { formatDateTime } from '@/lib/functions';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { DeleteUserRoleAlert } from './DeleteAlert';
import { usePermissionStore } from '@/store/permissionStore';

interface ColumnUserRole {
  currentPage: number;
  perPage: number;
}

export const UserRoleColumns = ({ currentPage, perPage }: ColumnUserRole) => {
  const { hasPermission } = usePermissionStore();
  const columns = useMemo<ColumnDef<any, UserRole>[]>(
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
        accessorKey: 'roleName',
        header: () => 'Role Name',
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
      ...(hasPermission('UPDATE.USER')
        ? [
            {
              id: 'actions',
              header: 'Action',
              cell: (info: any) => {
                const { id } = info.row.original;

                return (
                  <>
                    <ProtectedComponent permission="UPDATE.USER">
                      <DeleteUserRoleAlert id={id} />
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
