import { useState } from 'react';

interface PaginationParams {
  orderBy?: string;
  isDesc?: boolean;
  limit: number;
  offset: number;
}

interface UsePaginationReturn {
  pagination: PaginationParams;
  totalPages: number;
  currentPage: number;
  handlePageChange: (direction: 'prev' | 'next' | number) => void;
}

export function useTablePagination(total: number, initialLimit: number = 10): UsePaginationReturn {
  const [pagination, setPagination] = useState<PaginationParams>({
    limit: initialLimit,
    offset: 0,
  });

  const totalPages = Math.max(1, Math.ceil(total / pagination.limit));
  const currentPage = Math.min(
    totalPages,
    Math.max(1, Math.floor(pagination.offset / pagination.limit) + 1)
  );

  const handlePageChange = (direction: 'prev' | 'next' | number) => {
    setPagination((prev) => {
      let newOffset = prev.offset;

      if (typeof direction === 'number') {
        const newPage = Math.max(1, Math.min(direction, totalPages));
        newOffset = (newPage - 1) * prev.limit;
      } else if (direction === 'prev') {
        newOffset = Math.max(0, prev.offset - prev.limit);
      } else if (direction === 'next') {
        newOffset = Math.min(total - prev.limit, prev.offset + prev.limit);
      }

      return { ...prev, offset: newOffset };
    });
  };

  return {
    pagination,
    totalPages,
    currentPage,
    handlePageChange,
  };
}
