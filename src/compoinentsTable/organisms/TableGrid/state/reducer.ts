import { TableActionName } from '@/utils/constants/table';
import { IPlainObject } from '@/utils/types/common';
import { ActionType, TableViewState } from '@/utils/types/table';

export const tableReducer = (state: TableViewState<IPlainObject>, action: ActionType): TableViewState<IPlainObject> => {
  const { type, payload } = action;
  switch (type) {
    case TableActionName.CHANGE_PAGE: {
      return {
        ...state,
        currentPage: payload.page,
      };
    }
    case TableActionName.CHANGE_PAGE_SIZE: {
      return {
        ...state,
        rowsPerPage: payload.pageSize,
        currentPage: payload.page,
      };
    }
    case TableActionName.CHANGE_SORT_BY: {
      return {
        ...state,
        ...payload,
      };
    }
    case TableActionName.CHANGE_FILTER_CLIENT: {
      return {
        ...state,
        filter: {
          ...state.filter,
          client: {
            // ...state.filter,
            ...payload,
          },
        },
        currentPage: 0,
      };
    }
    case TableActionName.CHANGE_FILTER_SERVER: {
      return {
        ...state,
        filter: {
          ...state.filter,
          server: {
            // ...state.filter,
            ...payload,
          },
        },
        currentPage: 0,
      };
    }
    case TableActionName.RESET_PAGE_AND_RELOAD: {
      return {
        ...state,
        currentPage: 0,
        invalidate: true,
      };
    }
    case TableActionName.CHANGE_INVALIDATE: {
      return {
        ...state,
        invalidate: payload.invalidate,
      };
    }
    case TableActionName.CHANGE_COLUMN_FILTER: {
      return {
        ...state,
        columnFilter: {
          ...payload,
        },
      };
    }
    case TableActionName.CHANGE_SELECTED_ROWS: {
      return {
        ...state,
        selectedRows: payload,
      };
    }
    default:
      return state;
  }
};
