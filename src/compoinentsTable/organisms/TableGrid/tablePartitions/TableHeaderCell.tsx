import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { InfoOutlined } from '@mui/icons-material';
import { styled, TableCell, TableSortLabel, Tooltip } from '@mui/material';

import { IPlainObject } from '@/utils/types/common';
import { ISortInfo, ITableColumn } from '@/utils/types/table';

const HeaderLabel = styled('span')({
  alignItems: 'center',
  display: 'flex',
  width: '100%',
  gap: '4px',
});

const HeaderCellStyled = styled(TableCell)(({ theme }) => ({
  // padding: '8px 10px',
  position: 'relative',
  '&>div:first-of-type': {
    width: '100%',
    display: 'flex',
  },
  '&>div:last-of-type ': {
    position: 'absolute',
    top: 0,
    right: '2px',
    height: '100%',
    width: '3px !important',
    cursor: 'col-resize',
    borderRadius: '1px',
    '&:hover': { backgroundColor: theme.palette.blue['500'] },
  },
}));

interface ITableHeaderCellProps<TRowDataType extends IPlainObject> {
  sortInfo: ISortInfo;
  column: ITableColumn<TRowDataType>;
  onSortClick: ({ field }: { field: string }) => void;
}

const TableHeaderCell = <TRowDataType extends IPlainObject>({
  sortInfo,
  column,
  onSortClick,
}: ITableHeaderCellProps<TRowDataType>) => {
  const columnRef = useRef<any>();
  const [width, setWidth] = useState<number | undefined>(undefined);

  const handleClick = useCallback(() => {
    onSortClick({ field: column.field });
  }, [onSortClick, column]);

  const setCursorDocument = (isResizing: boolean) => {
    document.body.style.cursor = isResizing ? 'col-resize' : 'auto';
  };

  const handleOnMouseMove = (e: MouseEvent) => {
    const newWidth = e.clientX - columnRef.current?.getBoundingClientRect?.()?.left;
    columnRef.current.style.width = newWidth + 'px';
  };

  const handleOnMouseUp = () => {
    setCursorDocument(false);

    document.onmousemove = null;
    document.onmouseup = null;
  };

  const onClickResizeColumn = () => {
    setCursorDocument(true);
    document.onmousemove = handleOnMouseMove;
    document.onmouseup = handleOnMouseUp;
  };
  useEffect(() => {
    if (width) setWidth(columnRef.current?.clientWidth);
  }, [width]);

  return (
    <HeaderCellStyled
      id={`colum-key-${column.field}`}
      ref={columnRef}
      style={{ width: width ?? 'auto' }}
    >
      {column.sortable && (
        <TableSortLabel
          active={sortInfo.field === column.field}
          direction={sortInfo.field === column.field ? sortInfo.direction : 'asc'}
          onClick={handleClick}
          sx={{ width: '100%' }}
        >
          <HeaderLabel>
            {column.label}
            {!!column.helperMessage && (
              <Tooltip title={column.helperMessage}>
                <InfoOutlined fontSize="small" />
              </Tooltip>
            )}
          </HeaderLabel>
        </TableSortLabel>
      )}
      {!column.sortable && column.label && <HeaderLabel>{column.label}</HeaderLabel>}
      <div onMouseDownCapture={onClickResizeColumn} />
    </HeaderCellStyled>
  );
};

export default React.memo(TableHeaderCell) as typeof TableHeaderCell;
