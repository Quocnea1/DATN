import { TablePagination } from '@mui/material';

import { IPlainObject } from '@/utils/types/common';
import { ITableGrid } from '@/utils/types/table';

type ITablePaging<TRowDataType extends IPlainObject> = Pick<ITableGrid<TRowDataType>, 'paginationOptions'> & {
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (pageNumber: number) => void;
};

const TablePaging = <TRowDataType extends IPlainObject>({
  onPageChange,
  onRowsPerPageChange,
  paginationOptions: { currentPage, totalCount, rowsPerPage, rowsPerPageOptions },
}: ITablePaging<TRowDataType>) => {
  const handlePageChange = (event: React.MouseEvent | null, newPageIndex: number) => {
    onPageChange(newPageIndex);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(Number(event.target.value));
  };
  return (
    <>
      <TablePagination
        component="div"
        rowsPerPageOptions={rowsPerPageOptions}
        rowsPerPage={rowsPerPage}
        count={totalCount}
        page={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
};

export default TablePaging;
