/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Menu } from '@/types/MasterData/Menu/type';
import { useMemo } from 'react';
import { formatDateTime } from '@/lib/functions';
import { UpdateMenuForm } from './UpdateForm';
import { usePermissionStore } from '@/store/permissionStore';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { DeleteMenuAlert } from './DeleteAlert';

interface ColumnMenu {
  currentPage: number;
  perPage: number;
}

export const MenuColumns = ({ currentPage, perPage }: ColumnMenu) => {
  const { hasPermission } = usePermissionStore();

  const columns = useMemo<ColumnDef<any, Menu>[]>(
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
        accessorKey: 'menuName',
        header: () => 'Menu Name',
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
      ...(hasPermission('UPDATE.MENU') || hasPermission('DELETE.MENU')
        ? [
            {
              id: 'actions',
              header: 'Action',
              cell: (info: any) => {
                const { id, menuName } = info.row.original;

                const masterData = {
                  id,
                  menuName,
                };
                return (
                  <div className="flex items-center flex-col md:flex-row gap-1">
                    <ProtectedComponent permission="UPDATE.MENU">
                      <UpdateMenuForm data={masterData} />
                    </ProtectedComponent>
                    <ProtectedComponent permission="DELETE.MENU">
                      <DeleteMenuAlert id={id} />
                    </ProtectedComponent>
                  </div>
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
