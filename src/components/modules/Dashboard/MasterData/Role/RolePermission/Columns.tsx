/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { RolePermissionExt } from '@/types/RolePermission/type';
import { useMemo } from 'react';
import { formatDateTime } from '@/lib/functions';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { DeleteRolePermissionAlert } from './DeleteAlert';

interface ColumnRolePermission {
  currentPage: number;
  perPage: number;
}

export const RolePermissionColumns = ({ currentPage, perPage }: ColumnRolePermission) => {
  const columns = useMemo<ColumnDef<any, RolePermissionExt>[]>(
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
      {
        id: 'actions',
        header: 'Action',
        cell: (info: any) => {
          const { id } = info.row.original;

          // const masterData = {
          //   id,
          //   menuName,
          // };
          return (
            <>
              {/* <ProtectedComponent permission="VIEW.MENU">
                <UpdateMenuForm data={masterData} />
              </ProtectedComponent> */}
              <ProtectedComponent permission="VIEW.ROLE">
                <DeleteRolePermissionAlert id={id} />
              </ProtectedComponent>
            </>
          );
        },
      },
    ],
    [currentPage, perPage]
  );

  return columns;
};
