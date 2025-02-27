/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Employee } from '@/types/Employee/type';
import { useMemo, useState } from 'react';

export const EmployeeColumns = ({ onChoose }: any) => {
  const [selectedItem, setSelectedItem] = useState<Employee | null>(null);
  const columns = useMemo<ColumnDef<any, Employee>[]>(
    () => [
      {
        id: 'select',
        header: () => '',
        cell: (info) => {
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
          };

          return (
            <div className="flex items-center mb-4">
              <input
                id={`radio-${id}`}
                type="radio"
                name="master-radio"
                checked={selectedItem?.id === id}
                onChange={() => {
                  setSelectedItem(masterData);
                  onChoose(masterData);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
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
        accessorKey: 'gender',
        header: () => 'Gender',
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
        accessorKey: 'address',
        header: () => 'Address',
      },
    ],
    [onChoose, selectedItem]
  );

  return columns;
};
