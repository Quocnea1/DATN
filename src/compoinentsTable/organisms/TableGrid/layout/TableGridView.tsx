import { Box } from '@mui/material';

import { TableActions } from '@/components/organisms/TableGrid/state/action';
import TablePaging from '@/components/organisms/TableGrid/tablePartitions/TablePaging';
import TableUI from '@/components/organisms/TableGrid/tablePartitions/TableUI';

import { IPlainObject } from '@/utils/types/common';
import { ISortInfo, ITableGrid } from '@/utils/types/table';

const TableGridView = <TRowDataType extends IPlainObject>({
  rows,
  columnOptions,
  selectedRows = [],
  dispatch,
  sortOptions,
  onRowClick,
  isSingleSelect,
  isLoading,
  paginationOptions,
  hasSelectRows,
  primaryKey = '',
  hiddenPaging = false,
  hiddenTooltip = false,
}: ITableGrid<TRowDataType>) => {
  const onPageChange = (page: number) => TableActions.changePage(dispatch)(page);
  const onRowsPerPageChange = (pageSize: number) => TableActions.changePageSize(dispatch)(pageSize);
  const onSortChange = (sortBy: ISortInfo) => TableActions.changeSort(dispatch)(sortBy);

  const handleCheckAll = (checked: boolean) => {
    const selectedRows = checked ? [...rows] : [];
    TableActions.changeSelectedRows(dispatch)(selectedRows);
  };

  const handleCheckRow = ({ row, checked }: { row: TRowDataType; checked: boolean }) => {
    let selectedRowsTemp = [];

    if (checked) {
      selectedRowsTemp = isSingleSelect ? [] : [...selectedRows];
      selectedRowsTemp.push(row);
      TableActions.changeSelectedRows(dispatch)(rows);
    } else {
      selectedRowsTemp = [
        ...selectedRows.filter((currentSelectedRow) => {
          if (Array.isArray(primaryKey)) {
            let isRemove = true;
            for (const key of primaryKey) {
              if (currentSelectedRow[key] !== row[key]) {
                isRemove = false;
                break;
              }
            }
            return !isRemove;
          } else {
            return currentSelectedRow[primaryKey] !== row[primaryKey];
          }
        }),
      ];
    }
    TableActions.changeSelectedRows(dispatch)(selectedRowsTemp);
  };

  return (
    <>
      <Box marginTop="1rem">
        <TableUI<TRowDataType>
          columnOptions={columnOptions}
          rows={rows}
          selectedRows={selectedRows}
          sortOptions={sortOptions}
          isSingleSelect={isSingleSelect}
          isLoading={isLoading}
          onSortChange={onSortChange}
          onRowClick={onRowClick}
          hasSelectRows={hasSelectRows}
          onClickCheckAll={handleCheckAll}
          onClickCheckRow={handleCheckRow}
          primaryKey={primaryKey}
          hiddenTooltip={hiddenTooltip}
        />
      </Box>
      {!hiddenPaging && rows.length > 0 && (
        <TablePaging
          paginationOptions={paginationOptions}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </>
  );
};

export default TableGridView;
