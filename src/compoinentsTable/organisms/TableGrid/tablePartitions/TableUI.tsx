import { useMemo } from 'react';

import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';

import { SortDirectionTypes } from '@/utils/constants/table';
import { IPlainObject } from '@/utils/types/common';
import { ISortInfo, TableUIProps } from '@/utils/types/table';

import BodyCheckBoxCell from './BodyCheckBoxCell';
import HeaderCheckBoxCell from './HeaderCheckBoxCell';
import TableEmpty from './TableEmpty';
import TableHeaderCell from './TableHeaderCell';
import TableLoading from './TableLoading';

const TableBodyCellWrapper = styled('div')({
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TableUI = <TRowDataType extends IPlainObject>({
  isSingleSelect = false,
  hasSelectRows,
  rows = [],
  selectedRows,
  columnOptions,
  sortOptions,
  onRowClick = undefined,
  isLoading,
  onSortChange,
  onClickCheckAll,
  onClickCheckRow,
  primaryKey,
  hiddenTooltip,
}: TableUIProps<TRowDataType>) => {
  const handleClickRow = (event: React.MouseEvent, row: TRowDataType) => {
    onRowClick?.(row, event);
  };

  const handleSort = ({ field }: { field: string }) => {
    let sort: ISortInfo;
    if (field === sortOptions.field) {
      sort = {
        field: field,
        direction: sortOptions.direction === SortDirectionTypes.ASC ? SortDirectionTypes.DESC : SortDirectionTypes.ASC,
      };
    } else {
      sort = {
        field: field,
        direction: SortDirectionTypes.ASC,
      };
    }
    onSortChange(sort);
  };

  const selectedRowsPrimaryValue = useMemo<string[]>(() => {
    return (
      selectedRows?.map((row) => {
        if (Array.isArray(primaryKey)) {
          return primaryKey.map((key) => row[key]);
        } else {
          return row[primaryKey];
        }
      }) || []
    );
  }, [selectedRows]);

  const isSelectedRow = (row: TRowDataType): boolean => {
    if (Array.isArray(primaryKey)) {
      let isSelected = false;
      for (const primaryValues of selectedRowsPrimaryValue) {
        if (Array.isArray(primaryValues)) {
          let isEqual = true;
          for (const key of primaryKey) {
            if (!primaryValues.includes(row[key])) {
              isEqual = false;
              break;
            }
          }
          if (isEqual) {
            isSelected = true;
            break;
          }
        }
      }
      return isSelected;
    } else {
      return selectedRowsPrimaryValue.includes(row[primaryKey as string] as string) || false;
    }
  };

  return (
    <TableContainer>
      <Table sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            {hasSelectRows && (
              <HeaderCheckBoxCell
                rowsCount={rows.length}
                selectedRowsCount={selectedRows?.length || 0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onClickCheckAll?.(e.target.checked);
                }}
                disabled={isSingleSelect}
              />
            )}

            {columnOptions.map((column, idx) => {
              return (
                <TableHeaderCell
                  key={`table-head-row-${idx}`}
                  column={column}
                  onSortClick={handleSort}
                  sortInfo={sortOptions}
                />
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableLoading numOfColumns={hasSelectRows ? columnOptions.length + 1 : columnOptions.length} />
          ) : (
            <>
              {rows.length === 0 ? (
                <TableEmpty numOfColumns={hasSelectRows ? columnOptions.length + 1 : columnOptions.length} />
              ) : (
                <>
                  {rows.map((row, idx) => {
                    return (
                      <TableRow
                        key={`table-body-contents-${idx}`}
                        onClick={(e) => handleClickRow(e, row)}
                        selected={isSelectedRow(row)}
                      >
                        {hasSelectRows && (
                          <BodyCheckBoxCell<TRowDataType>
                            key={'table-body-contents-selection'}
                            row={row}
                            checked={isSelectedRow(row)}
                            onChange={onClickCheckRow}
                          />
                        )}
                        {columnOptions.map((column, jdx) => {
                          return (
                            <TableCell
                              key={`table-body-contents-${idx}-${jdx}`}
                              onClick={
                                column?.stopClickEvent
                                  ? (e) => {
                                      e.stopPropagation();
                                    }
                                  : undefined
                              }
                            >
                              <Tooltip
                                title={!hiddenTooltip ? row[column.field] : ''}
                                followCursor
                                placement="bottom-start"
                              >
                                <TableBodyCellWrapper>
                                  {column?.valueRenderAs ? column.valueRenderAs(row) : row[column.field]}
                                </TableBodyCellWrapper>
                              </Tooltip>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableUI;
