import { useReducer } from 'react';

import { tableReducer } from '@/components/organisms/TableGrid/state/reducer';

import { rowsPerPageDefault, rowsPerPageOptionsDefault, SortDirectionTypes } from '@/utils/constants/table';
import { IPlainObject } from '@/utils/types/common';
import { ActionType, FilterFormType, ISortInfo, ITableFilter, TableViewState } from '@/utils/types/table';

type UseTableProps = {
  sortDefault: ISortInfo;
  rowsPerPage?: number;
  currentPage?: number;
  filterDefault?: FilterFormType;
};

interface IUseTableResult<TRowDataType extends IPlainObject> {
  dispatch: (type: ActionType) => void;
  filter: ITableFilter;
  selectedRows: TRowDataType[];
}

const initValue: TableViewState<IPlainObject> = {
  currentPage: 0,
  rowsPerPage: rowsPerPageDefault,
  columnFilter: {},
  invalidate: false,
  selectedRows: [],
  filter: { client: {}, server: {} },
  sortBy: { direction: SortDirectionTypes.ASC, field: '' },
};

//TODO: Trigger filter client to filter server, click search for trigger instead of onChange realtime
const useTableQueryServer = <TRowDataType extends IPlainObject>({
  sortDefault,
  rowsPerPage = rowsPerPageDefault,
  currentPage = 0,
}: UseTableProps): IUseTableResult<TRowDataType> => {
  const [tableState, dispatch] = useReducer(tableReducer, {
    ...initValue,
    sortBy: sortDefault,
    currentPage: currentPage,
    rowsPerPage: rowsPerPage,
  });

  return {
    dispatch,
    filter: {
      filterClient: {},
      filterServer: tableState.filter.server,
      paginationOptions: {
        rowsPerPageOptions: rowsPerPageOptionsDefault,
        totalCount: 0,
        rowsPerPage: tableState.rowsPerPage,
        currentPage: tableState.currentPage,
      },
      sortBy: tableState.sortBy,
    },
    selectedRows: tableState.selectedRows as TRowDataType[],
  };
};

export default useTableQueryServer;
