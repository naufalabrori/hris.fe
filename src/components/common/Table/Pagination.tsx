/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button';
import { PaginationProps } from './types';

export function DataTablePagination({
  currentPage,
  totalPages,
  total,
  offset,
  limit,
  onPageChange,
}: PaginationProps) {
  // Helper function to generate page numbers with ellipsis
  const generatePageNumbers = () => {
    const maxPages = 5; // Limit number of pages to display

    if (totalPages <= maxPages) {
      // Show all pages if total pages <= maxPages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      // Near the start: show first 4 pages and last page
      return [1, 2, 3, 4, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      // Near the end: show first page and last 4 pages
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    // In the middle: show first page, current page +/- 1, and last page
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2">
      <div className="text-xs text-muted-foreground font-semibold">
        {total === 0
          ? 'Showing 0 to 0 of 0 entries'
          : `Showing ${(currentPage - 1) * limit + 1} to ${Math.min(
              currentPage * limit,
              total
            )} of ${total} entries`}
      </div>

      <div className="flex flex-wrap items-center gap-1">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {/* Page Numbers */}
        {generatePageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <Button
              key={page}
              className={
                page === currentPage
                  ? 'font-medium'
                  : 'bg-white border hover:bg-gray-200 font-medium text-black'
              }
              size="sm"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ) : (
            <Button key={`ellipsis-${index}`} variant="outline" size="sm" disabled>
              ...
            </Button>
          )
        )}

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
