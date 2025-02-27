/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Role } from '@/types/MasterData/Role/type';
import { useMemo } from 'react';
import { formatDateTime } from '@/lib/functions';
import { usePermissionStore } from '@/store/permissionStore';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EyeIcon } from 'lucide-react';
// import { ProtectedComponent } from '@/components/common/ProtectedComponent';

interface ColumnRole {
  currentPage: number;
  perPage: number;
}

export const RoleColumns = ({ currentPage, perPage }: ColumnRole) => {
  const { hasPermission } = usePermissionStore();
  const pathname = usePathname();

  const columns = useMemo<ColumnDef<any, Role>[]>(
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
      ...(hasPermission('UPDATE.ROLE')
        ? [
            {
              id: 'actions',
              header: 'Action',
              cell: (info: any) => {
                const { id } = info.row.original;

                return (
                  <>
                    <ProtectedComponent permission="VIEW.ROLE">
                      <Link href={`${pathname}/${id}`}>
                        <Button className="mr-1 bg-blue-500 hover:bg-blue-600 p-3">
                          <EyeIcon />
                        </Button>
                      </Link>
                    </ProtectedComponent>
                  </>
                );
              },
            },
          ]
        : []),
    ],
    [currentPage, perPage, hasPermission, pathname]
  );

  return columns;
};
