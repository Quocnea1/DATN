import { TableCell, TableRow } from '@mui/material';

import Loader from '@/components/molecules/Loader/Loader';

type TableEmptyProps = {
  numOfColumns?: number;
};

const TableLoading = ({ numOfColumns }: TableEmptyProps) => {
  return (
    <TableRow>
      <TableCell colSpan={numOfColumns}>
        <Loader />
      </TableCell>
    </TableRow>
  );
};

export default TableLoading;
