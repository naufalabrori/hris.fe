/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Leave } from '@/types/Activity/Leave/type';
import { useMemo } from 'react';
import { formatDate, formatDateTime } from '@/lib/functions';
import { Badge } from '@/components/ui/badge';
import { UpdateLeaveForm } from './UpdateForm';
import { usePermissionStore } from '@/store/permissionStore';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { ApproveLeaveAlert } from './ApproveForm';

interface ColumnLeave {
  currentPage: number;
  perPage: number;
}

export const LeaveColumns = ({ currentPage, perPage }: ColumnLeave) => {
  const { hasPermission } = usePermissionStore();

  const columns = useMemo<ColumnDef<any, Leave>[]>(
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
        accessorKey: 'leaveType',
        header: () => 'Leave Type',
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
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return (
            <Badge
              className={
                status == 'Cancelled'
                  ? 'bg-red-500 hover:bg-red-600'
                  : status == 'Pending'
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-green-500 hover:bg-green-600'
              }
            >
              {status}
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
      ...(hasPermission('UPDATE.LEAVE')
        ? [
            {
              id: 'actions',
              header: 'Action',
              cell: (info: any) => {
                const { id, leaveType, startDate, endDate, status, employeeId } = info.row.original;

                const masterData = {
                  id,
                  leaveType,
                  startDate,
                  endDate,
                  status,
                  employeeId,
                };
                return (
                  <>
                    {status == 'Pending' && (
                      <div className="flex flex-col md:flex-row gap-1">
                        <ProtectedComponent permission="UPDATE.LEAVE">
                          <UpdateLeaveForm data={masterData} />
                        </ProtectedComponent>
                        <ProtectedComponent permission="APPROVE.LEAVE">
                          <ApproveLeaveAlert id={id} />
                        </ProtectedComponent>
                      </div>
                    )}
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
