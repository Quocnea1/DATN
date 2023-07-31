import { useEffect, useMemo, useReducer } from 'react';

import { TableActions } from '@/components/organisms/TableGrid/state/action';
import { tableReducer } from '@/components/organisms/TableGrid/state/reducer';

import { rowsPerPageDefault, rowsPerPageOptionsDefault, SortDirectionTypes } from '@/utils/constants/table';
import { IPlainObject } from '@/utils/types/common';
import { ActionType, FilterFormType, ISortInfo, ITableFilter, TableViewState } from '@/utils/types/table';

// import usePaginationClient from './usePaginationClient';

type FilterLogicCallbackType = <TRowDataType extends IPlainObject>(
  row: TRowDataType,
  filterValues: { [key: string]: string | number }
) => boolean;

type UseTableProps<TRowData extends IPlainObject> = {
  rows: TRowData[];
  sortDefault: ISortInfo;
  filterDefault?: FilterFormType;
  isUsePagination?: boolean;
};

interface IUseTableResult<TRowDataType extends IPlainObject> {
  dispatch: (type: ActionType) => void;
  filter: ITableFilter;
  currentPageRows: TRowDataType[];
  selectedRows: TRowDataType[];
}

const filterLogic = (row: Record<string, unknown>, filterFormValue: FilterFormType) => {
  let result = true;
  Object.keys(filterFormValue).forEach((key: string) => {
    if (Object.prototype.hasOwnProperty.call(row, key)) {
      if (
        !(row[key] as string)
          ?.toString()
          .toLowerCase()
          .includes((filterFormValue[key] as string)?.toString().toLowerCase())
      ) {
        result = false;
        return;
      }
    }
  });
  return result;
};

const execSort = <TRowDataType extends IPlainObject>(list: TRowDataType[], { field, direction }: ISortInfo) => {
  const temp = [...list];
  const thisOrder = direction === SortDirectionTypes.ASC ? 1 : -1;
  return temp.sort((a, b) => {
    const x = a[field] as string;
    const y = b[field] as string;
    const newOrder = x > y ? 1 : x < y ? -1 : 0;
    return newOrder * thisOrder;
  });
};

// Pure function handle filtering
const execFilter = <TRowDataType extends IPlainObject>(
  list: TRowDataType[],
  filterValues: IPlainObject,
  filterLogic: FilterLogicCallbackType
) => {
  let arr = [...list];
  arr = arr.filter((row) => {
    return filterLogic(row, filterValues);
  });
  return arr;
};

const initValue: TableViewState<IPlainObject> = {
  currentPage: 0,
  rowsPerPage: rowsPerPageDefault,
  columnFilter: {},
  invalidate: false,
  selectedRows: [],
  filter: { client: {}, server: {} },
  sortBy: { direction: 'asc', field: '' },
};

const useTable = <TRowDataType extends IPlainObject>({
  rows = [],
  sortDefault,
  filterDefault = {},
  isUsePagination = true,
}: UseTableProps<TRowDataType>): IUseTableResult<TRowDataType> => {
  const [tableState, dispatch] = useReducer(tableReducer, {
    ...initValue,
    sortBy: sortDefault,
    filter: {
      server: filterDefault,
      client: {},
    },
  });

  const rowsFiltered: TRowDataType[] = useMemo(() => {
    if (rows?.length) {
      let handlingArr = [...rows];
      if (Object.keys(tableState.filter.client).length) {
        handlingArr = execFilter(handlingArr, tableState.filter.client, filterLogic);
      }
      handlingArr = execSort(handlingArr, tableState.sortBy);
      return handlingArr;
    } else {
      return [];
    }
  }, [rows, tableState.sortBy, tableState.filter.client]);

  const currentPageRows = useMemo(() => {
    const offset = tableState.currentPage * tableState.rowsPerPage;
    return rowsFiltered.slice(offset, offset + tableState.rowsPerPage);
  }, [rowsFiltered, tableState.currentPage, tableState.rowsPerPage]);

  useEffect(() => {
    //TODO: Detect exceed nest infinitive
    if (tableState.selectedRows?.length && isUsePagination) {
      TableActions.changeSelectedRows(dispatch)([]);
    }
  }, [currentPageRows]);

  useEffect(() => {
    //TODO: Reset current page when rows change and reset current page when search server
    // TableActions.changePage(dispatch)(1);
  }, [rows]);

  return {
    currentPageRows: currentPageRows,
    dispatch,
    filter: {
      filterClient: tableState.filter.client,
      filterServer: tableState.filter.server,
      paginationOptions: {
        rowsPerPageOptions: rowsPerPageOptionsDefault,
        totalCount: rowsFiltered?.length || 0,
        rowsPerPage: tableState.rowsPerPage,
        currentPage: tableState.currentPage,
      },
      sortBy: tableState.sortBy,
    },
    selectedRows: tableState.selectedRows as TRowDataType[],
  };
};

export default useTable;
