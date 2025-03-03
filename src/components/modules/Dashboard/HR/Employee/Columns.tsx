/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Employee } from '@/types/HumanResource/Employee/type';
import { useMemo } from 'react';
import { formatDate, formatDateTime } from '@/lib/functions';
import { UpdateEmployeeForm } from './UpdateForm';
import { usePermissionStore } from '@/store/permissionStore';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EyeIcon } from 'lucide-react';

interface ColumnEmployee {
  currentPage: number;
  perPage: number;
}

export const EmployeeColumns = ({ currentPage, perPage }: ColumnEmployee) => {
  const { hasPermission } = usePermissionStore();
  const pathname = usePathname();

  const columns = useMemo<ColumnDef<any, Employee>[]>(
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
        accessorKey: 'firstName',
        header: () => 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: () => 'Last Name',
      },
      {
        accessorKey: 'email',
        header: () => 'Email',
      },
      {
        accessorKey: 'phoneNumber',
        header: () => 'Phone Number',
      },
      {
        accessorKey: 'dateOfBirth',
        header: () => 'Date of Birth',
        cell: ({ row }) => formatDate(row.getValue('dateOfBirth')),
      },
      {
        accessorKey: 'jobName',
        header: () => 'Job Name',
      },
      {
        accessorKey: 'departmentName',
        header: () => 'Department Name',
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
      ...(hasPermission('UPDATE.EMPLOYEE')
        ? [
            {
              id: 'actions',
              header: 'Action',
              cell: (info: any) => {
                const {
                  id,
                  firstName,
                  lastName,
                  gender,
                  dateOfBirth,
                  email,
                  phoneNumber,
                  address,
                  hireDate,
                  jobTitleId,
                  departmentId,
                  managerId,
                  employmentStatus,
                  salary,
                  isActive,
                } = info.row.original;

                const masterData = {
                  id,
                  firstName,
                  lastName,
                  gender,
                  dateOfBirth,
                  email,
                  phoneNumber,
                  address,
                  hireDate,
                  jobTitleId,
                  departmentId,
                  managerId,
                  employmentStatus,
                  salary,
                  isActive,
                };
                return (
                  <div className="flex items-center flex-col md:flex-row gap-1">
                    <ProtectedComponent permission="VIEW.EMPLOYEE">
                      <Link href={`${pathname}/${id}`}>
                        <Button className="bg-blue-500 hover:bg-blue-600">
                          <EyeIcon />
                        </Button>
                      </Link>
                    </ProtectedComponent>
                    <ProtectedComponent permission="UPDATE.EMPLOYEE">
                      <UpdateEmployeeForm data={masterData} />
                    </ProtectedComponent>
                  </div>
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
