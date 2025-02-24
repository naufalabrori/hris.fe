import { ColumnDef } from '@tanstack/react-table';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData?: TData[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  offset: number;
  limit: number;
  onPageChange: (direction: 'prev' | 'next' | number) => void;
}
