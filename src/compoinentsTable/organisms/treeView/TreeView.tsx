import { useEffect, useMemo, useState } from 'react';

import { Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import {
  HeaderCellStyled,
  HeaderLabel,
  StyledIconButton,
  TableBodyCellWrapper,
} from '@/components/organisms/treeView/styled';

import { IPlainObject } from '@/utils/types/common';

type TreeData<TData> = {
  isCollapse: boolean;
  isHaveChild: boolean;
  isShowChild: boolean;
  parentIndex?: number;
} & TData;

interface ITableColumn<TRowDataType> {
  field: string;
  label?: string;
  width?: number;
  valueRenderAs?: (rowData: TRowDataType) => React.ReactNode;
  flex?: number;
  rootColumn?: boolean;
}

const TreeView = <TRowDataType extends IPlainObject>({
  data = [],
  columnOptions = [],
}: {
  data?: TRowDataType[];
  columnOptions?: ITableColumn<TRowDataType>[];
}) => {
  const [treeData, setTreeData] = useState<TreeData<TRowDataType>[]>([]);

  const getParentIndex = (index: number, seq: number): number | undefined => {
    for (let i = index; i > -1; i--) {
      if (i < data.length && data[i].task_seq === seq - 1) {
        return i;
      }
    }
    return undefined;
  };

  const getParentShowChildrenStatus = (parentIndex?: number): boolean => {
    //if don't have parent => true
    if (parentIndex === undefined) {
      return true;
    }

    // if have parent and show child status is true => return the show children status of the top parent
    if (treeData[parentIndex].isShowChild) {
      return getParentShowChildrenStatus(treeData[parentIndex].parentIndex);
    } else {
      // in case show child status is false
      return false;
    }
  };

  // assign need field for data
  const formatData = useMemo((): TreeData<TRowDataType>[] => {
    return data.map((item, index) => {
      const nextItemSeq = data?.[index + 1]?.task_seq ?? 0;
      const parentIndex = getParentIndex(index, item.task_seq);

      const temp = {
        ...item,
        isCollapse: true,
        isHaveChild: nextItemSeq > item?.task_seq,
        isShowChild: true,
        parentIndex,
      };

      return temp;
    });
  }, [data]);

  const totalFlex = columnOptions.reduce((accumulator, currentValue) => (currentValue?.flex || 1) + accumulator, 0);

  const changeCollapseStatus = (index: number) => {
    // new tree data
    const temp = [...treeData];

    // current clicked item data
    const currentItem: TreeData<TRowDataType> = temp[index];

    for (let i = index + 1; i < temp.length; i++) {
      if (temp?.[i] && temp[index].task_seq === temp?.[i].task_seq - 1) {
        const newItem: TreeData<TRowDataType> = temp[i];

        if (currentItem.isShowChild) {
          newItem.isCollapse = false;
        } else {
          newItem.isCollapse = true;
        }
        temp[i] = newItem;
        continue;
      }

      break;
    }

    currentItem.isShowChild = !currentItem.isShowChild;
    temp[index] = currentItem;
    setTreeData(temp);
  };

  useEffect(() => {
    if (formatData.length) {
      setTreeData(formatData);
    }
  }, [formatData]);

  return (
    <TableContainer sx={{ paddingBottom: '10px' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ display: 'flex', flex: 1 }}>
            {columnOptions.map((column, idx) => {
              return (
                <HeaderCellStyled
                  key={idx}
                  id={`colum-key-${idx}`}
                  sx={{ display: 'flex', flex: column?.flex || 1, border: 0 }}
                >
                  <HeaderLabel>{column.label}</HeaderLabel>
                </HeaderCellStyled>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {treeData.map((row, idx) => {
            const depth = (row?.task_seq || 1) - 1;

            const isShow = getParentShowChildrenStatus(row.parentIndex);

            return (
              <>
                {row?.isCollapse && isShow && (
                  <TableRow
                    key={idx}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                  >
                    {columnOptions.map((column, jdx) => {
                      const fieldLabel = column.field;
                      return (
                        <TableCell
                          sx={{
                            display: 'flex',
                            flex: column?.flex || 1,
                            border: 0,
                            maxWidth: `${(column?.flex || 1) / totalFlex}`,
                          }}
                          key={`table-body-contents-${idx}-${jdx}`}
                        >
                          <Collapse
                            key={idx}
                            in={row?.isCollapse}
                            sx={{ display: 'flex', flex: 1 }}
                          >
                            <TableBodyCellWrapper paddingLeft={column?.rootColumn ? `${depth * 25}px` : undefined}>
                              {column?.rootColumn && (
                                <StyledIconButton
                                  opacity={column?.rootColumn && row?.isHaveChild ? 1 : 0}
                                  aria-label="expand row"
                                  size="small"
                                  onClick={() => changeCollapseStatus(idx)}
                                >
                                  {!row?.isShowChild ? '►' : '▼'}
                                </StyledIconButton>
                              )}

                              {column?.valueRenderAs ? column.valueRenderAs(row) : row[fieldLabel]}
                            </TableBodyCellWrapper>
                          </Collapse>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )}
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TreeView;
