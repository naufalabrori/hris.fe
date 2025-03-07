/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Payroll } from '@/types/Finance/Payroll/type';
import { useMemo } from 'react';
import { formatDate, formatDateTime, formatRupiah } from '@/lib/functions';
// import { UpdatePayrollForm } from './UpdateForm';
// import { usePermissionStore } from '@/store/permissionStore';
// import { ProtectedComponent } from '@/components/common/ProtectedComponent';

interface ColumnPayroll {
  currentPage: number;
  perPage: number;
}

export const PayrollColumns = ({ currentPage, perPage }: ColumnPayroll) => {
  // const { hasPermission } = usePermissionStore();

  const columns = useMemo<ColumnDef<any, Payroll>[]>(
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
        accessorKey: 'employeeName',
        header: () => 'Employee Name',
      },
      {
        accessorKey: 'payPeriodStartDate',
        header: () => 'Pay Period Start Date',
        cell: ({ row }) => formatDate(row.getValue('payPeriodStartDate')),
      },
      {
        accessorKey: 'payPeriodEndDate',
        header: () => 'Pay Period End Date',
        cell: ({ row }) => formatDate(row.getValue('payPeriodEndDate')),
      },
      {
        accessorKey: 'grossSalary',
        header: () => 'Gross Salary',
        cell: ({ row }) => formatRupiah(row.getValue('grossSalary')),
      },
      {
        accessorKey: 'deductions',
        header: () => 'Deductions',
        cell: ({ row }) => formatRupiah(row.getValue('deductions')),
      },
      {
        accessorKey: 'netSalary',
        header: () => 'Net Salary',
        cell: ({ row }) => formatRupiah(row.getValue('netSalary')),
      },
      {
        accessorKey: 'paymentDate',
        header: () => 'Payment Date',
        cell: ({ row }) => formatDate(row.getValue('paymentDate')),
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
      // ...(hasPermission('UPDATE.Payroll')
      //   ? [
      //       {
      //         id: 'actions',
      //         header: 'Action',
      //         cell: (info: any) => {
      //           const { id, PayrollName, managerId, location, isActive } = info.row.original;

      //           const masterData = {
      //             id,
      //             PayrollName,
      //             managerId,
      //             location,
      //             isActive,
      //           };
      //           return (
      //             <>
      //               <ProtectedComponent permission="UPDATE.Payroll">
      //                 <UpdatePayrollForm data={masterData} />
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
