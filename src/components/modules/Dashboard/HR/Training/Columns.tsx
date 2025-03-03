/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Training } from '@/types/HumanResource/Training/type';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { formatDateTime, formatDate } from '@/lib/functions';
import { usePermissionStore } from '@/store/permissionStore';
import { UpdateTrainingForm } from './UpdateForm';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';

interface ColumnTraining {
  currentPage: number;
  perPage: number;
}

export const TrainingColumns = ({ currentPage, perPage }: ColumnTraining) => {
  const { hasPermission } = usePermissionStore();

  const columns = useMemo<ColumnDef<any, Training>[]>(
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
        accessorKey: 'trainingName',
        header: () => 'Training Name',
      },
      {
        accessorKey: 'description',
        header: () => 'Description',
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
        accessorKey: 'trainer',
        header: () => 'Trainer',
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
      ...(hasPermission('UPDATE.TRAINING')
        ? [
            {
              id: 'actions',
              header: 'Action',
              cell: (info: any) => {
                const { id, trainingName, description, startDate, endDate, trainer, isActive } =
                  info.row.original;

                const masterData = {
                  id,
                  trainingName,
                  description,
                  startDate,
                  endDate,
                  trainer,
                  isActive,
                };
                return (
                  <>
                    <ProtectedComponent permission="UPDATE.TRAINING">
                      <UpdateTrainingForm data={masterData} />
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
