/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { UserRole } from '@/types/UserRole/type';
import { useMemo } from 'react';
import { formatDateTime } from '@/lib/functions';

interface ColumnUserRole {
  currentPage: number;
  perPage: number;
}

export const UserRoleColumns = ({ currentPage, perPage }: ColumnUserRole) => {
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
      // ...(hasPermission('UPDATE.USER')
      //   ? [
      //       {
      //         id: 'actions',
      //         header: 'Action',
      //         cell: (info: any) => {
      //           const { id } = info.row.original;

      //           return (
      //             <>
      //               <ProtectedComponent permission="VIEW.UserRole">
      //                 <Link href={`${pathname}/${id}`}>
      //                   <Button className="mr-1 bg-blue-500 hover:bg-blue-600 p-3">
      //                     <EyeIcon />
      //                   </Button>
      //                 </Link>
      //               </ProtectedComponent>
      //             </>
      //           );
      //         },
      //       },
      //     ]
      //   : []),
    ],
    [currentPage, perPage]
  );

  return columns;
};
