/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/types/MasterData/User/type';
import { useMemo } from 'react';
import { formatDateTime } from '@/lib/functions';
import { usePermissionStore } from '@/store/permissionStore';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EyeIcon } from 'lucide-react';

interface ColumnUser {
  currentPage: number;
  perPage: number;
}

export const UserColumns = ({ currentPage, perPage }: ColumnUser) => {
  const { hasPermission } = usePermissionStore();
  const pathname = usePathname();

  const columns = useMemo<ColumnDef<any, User>[]>(
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
        accessorKey: 'username',
        header: () => 'User Name',
      },
      {
        accessorKey: 'email',
        header: () => 'Email',
      },
      {
        accessorKey: 'lastLogin',
        header: () => 'Last Login',
        cell: ({ row }) => formatDateTime(row.getValue('lastLogin')),
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
                    <ProtectedComponent permission="VIEW.USER">
                      <Link href={`${pathname}/${id}`}>
                        <Button className="bg-blue-500 hover:bg-blue-600">
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
