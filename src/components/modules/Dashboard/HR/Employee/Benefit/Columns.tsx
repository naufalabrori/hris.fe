/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Benefit } from '@/types/HumanResource/Benefit/type';
import { useMemo } from 'react';
import { formatDate, formatDateTime } from '@/lib/functions';
import { Badge } from '@/components/ui/badge';
// import { ProtectedComponent } from '@/components/common/ProtectedComponent';
// import { usePermissionStore } from '@/store/permissionStore';

interface ColumnBenefit {
  currentPage: number;
  perPage: number;
}

export const BenefitColumns = ({ currentPage, perPage }: ColumnBenefit) => {
  // const { hasPermission } = usePermissionStore();

  const columns = useMemo<ColumnDef<any, Benefit>[]>(
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
        accessorKey: 'benefitType',
        header: () => 'Benefit Type',
      },
      {
        accessorKey: 'startDate',
        header: () => 'Start Date',
        cell: ({ row }) => formatDate(row.getValue('startDate')),
      },
      {
        accessorKey: 'endDate',
        header: () => 'End Date',
        cell: ({ row }) => formatDate(row.getValue('endDate')),
      },
      {
        accessorKey: 'details',
        header: () => 'Details',
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
        accessorKey: 'createdDate',
        header: () => 'Created Date',
        cell: ({ row }) => formatDateTime(row.getValue('createdDate')),
      },
      {
        accessorKey: 'modifiedDate',
        header: () => 'Modified Date',
        cell: ({ row }) => formatDateTime(row.getValue('modifiedDate')),
      },
      // ...(hasPermission('UPDATE.EMPLOYEE')
      //   ? [
      //       {
      //         id: 'actions',
      //         header: 'Action',
      //         cell: (info: any) => {
      //           const {
      //             id,
      //             isActive,
      //           } = info.row.original;

      //           const masterData = {
      //             id,
      //             isActive,
      //           };
      //           return (
      //             <div className="flex items-center flex-col md:flex-row gap-1">
      //               <ProtectedComponent permission="UPDATE.EMPLOYEE">
      //                 <UpdateEmployeeForm data={masterData} />
      //               </ProtectedComponent>
      //             </div>
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
