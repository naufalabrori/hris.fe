/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  ColumnDef,
  useReactTable,
} from '@tanstack/react-table';

import { Table } from '@/components/ui/table';
import { DataTablePagination } from '@/components/common/Table/Pagination';
import { DataTableHeader } from '@/components/common/Table/TableHeader';
import { DataTableBody } from '@/components/common/Table/TableBody';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NumberOfShowTable } from '@/lib/constant';
import { UserRoleColumns } from './Columns';
import { PaginationParams } from '@/types/PaginationType';
import { useTablePagination } from '@/hooks/useTablePagination';
import { useDebounce } from 'use-debounce';
import { UserRole } from '@/types/MasterData/UserRole/type';
import { useListUserRole } from '@/hooks/Services/MasterData/UserRole/useGetUserRoles';
import SearchInputField from '@/components/common/Input/SearchInputField';

interface UseTableDataReturn<TData> {
  data: TData[];
  total: number;
  loading: boolean;
  error: Error | null;
}

function useTableData<TData>(
  sorting: SortingState,
  pagination: PaginationParams,
  filter: any,
  userId: string
): UseTableDataReturn<TData> {
  const [data, setData] = useState<TData[]>([]);
  const [total, setTotal] = useState(0);

  const sortField = sorting[0];
  const params: any = {
    ...pagination,
    sortBy: sortField?.id || 'createdDate',
    isDesc: sortField?.desc || false,
    [filter.key]: filter.value || '',
    userId: userId,
  };

  const { data: queryData, error, isLoading } = useListUserRole(params);

  useEffect(() => {
    if (queryData) {
      setData(queryData.data as TData[]);
      setTotal(queryData.totalData);
    }
  }, [queryData]);

  return { data, total, loading: isLoading, error };
}

export function UserRoleDataTable({ userId }: { userId: string }) {
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState<string>('5');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdDate', desc: true }]);
  const [filterBy, setFilterBy] = useState<string>('roleName');
  const [filterValue, setFilterValue] = useState<string>('');
  const [debounceFilter] = useDebounce(filterValue, 1000);

  const { pagination, totalPages, currentPage, handlePageChange } = useTablePagination(
    totalData,
    Number(limit)
  );

  const { data, total, loading, error } = useTableData<UserRole>(
    sorting,
    pagination,
    {
      key: filterBy,
      value: debounceFilter,
    },
    userId
  );

  const columns: ColumnDef<any, UserRole>[] = UserRoleColumns({
    currentPage,
    perPage: Number(limit),
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const dataColumnFiltering = [{ key: 'roleName', value: 'Role Name' }];

  useEffect(() => {
    setTotalData(total);
  }, [total]);

  const handleLimitChange = (value: string) => {
    setLimit(value);
    pagination.limit = Number(value);
    handlePageChange(0);
  };

  const handleFilterValueChange = (value: string) => {
    setFilterValue(value);
    handlePageChange(0);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <div>
          <div className="flex gap-2 mb-2">
            <Select
              value={filterBy}
              onValueChange={(value) => {
                setFilterBy(value);
              }}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dataColumnFiltering.map((coll) => (
                    <SelectItem key={coll.key} value={coll.key}>
                      {coll.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <SearchInputField
              placeholder="Search"
              value={filterValue}
              onChange={(event) => handleFilterValueChange(event.target.value)}
              className="max-w-xs"
            />
          </div>
        </div>
        <div className="flex">
          <div className="mr-2 mt-2 text-sm">Show</div>
          <Select value={limit} onValueChange={(value) => handleLimitChange(value)}>
            <SelectTrigger className="w-16">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {NumberOfShowTable.map((item) => (
                  <SelectItem key={item.label} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="mt-2 ml-2 text-sm">entries</div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <DataTableHeader headerGroups={table.getHeaderGroups()} />
          <DataTableBody
            loading={loading}
            error={error}
            rows={table.getRowModel().rows}
            columnLength={columns.length}
          />
        </Table>
      </div>
      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        offset={pagination.offset}
        limit={pagination.limit}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
