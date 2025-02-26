import { TableCell, TableRow } from '@/components/ui/table';
import { ThreeCircles } from 'react-loader-spinner';

interface LoadingRowProps {
  colSpan: number;
}

export function LoadingRow({ colSpan }: LoadingRowProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-24">
        <div className="flex items-center justify-center">
          <ThreeCircles
            visible={true}
            height="50"
            width="50"
            color="gray"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
