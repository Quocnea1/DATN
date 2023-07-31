import * as React from 'react';

import SearchIcon from '@mui/icons-material/SearchOutlined';
import {
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';

import { CmTextField } from '@/components/atoms/DataInput';
import { TableActions } from '@/components/organisms/TableGrid/state/action';
import SearchInputBaseDropdownControl from '@/components/organisms/TableGrid/tablePartitions/SearchInputBaseDropdownControl';

import { FilterTypes } from '@/utils/constants/table';
import { IPlainObject } from '@/utils/types/common';
import { ActionType, DropdownOptionType, FilterFormType, IFilterConfig, IFilterElementType } from '@/utils/types/table';

interface IFilterPanelProps<TRowDataType> {
  filterConfig: IFilterConfig;
  selectedRows?: TRowDataType[];
  dispatch: (type: ActionType) => void;
  filterClient: FilterFormType;
  type?: 'client' | 'server';
}

const FilterPanel = <TRowDataType extends IPlainObject>({
  filterConfig,
  dispatch,
  filterClient,
  type = 'client',
}: IFilterPanelProps<TRowDataType>) => {
  const onChangeFilterClient = (filterFormData: FilterFormType) => {
    if (type === 'client') {
      TableActions.changeFilterClient(dispatch)(filterFormData);
      return;
    }

    TableActions.changeFilterServer(dispatch)(filterFormData);
  };

  const renderActionControl = (control: IFilterElementType, actionIndex: number) => {
    switch (control.type) {
      case FilterTypes.DROPDOWN: {
        if (control.component) {
          const DropdownComponent = control.component;
          if (DropdownComponent) {
            return (
              <DropdownComponent
                key={actionIndex}
                onChangeFilterClient={onChangeFilterClient}
                // onChangeFilterServer={onChangeFilterServer}
                {...control}
              />
            );
          }
        }
        return (
          <Select
            key={actionIndex}
            onChange={(e: SelectChangeEvent) => {
              const value = e.target.value;
              onChangeFilterClient?.({ ...filterClient, [control.name]: value === 'ALL' ? '' : value });
            }}
            defaultValue={control?.options?.[0].value || ''}
            size="small"
            sx={{ width: '180px' }}
          >
            {control?.options?.map((item: DropdownOptionType, index: number) => {
              return (
                <MenuItem
                  key={index}
                  value={item.value}
                >
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        );
      }

      case 'filter': {
        return (
          <SearchInputBaseDropdownControl
            key={actionIndex}
            options={control.options}
            defaultValue={control.defaultValue}
            onSearchChange={onChangeFilterClient}
            filterState={filterClient}
            isAlwaysOpenFilter={control?.isAlwaysOpenFilter}
            isChangeOnEnter={control?.isChangeOnEnter}
          />
        );
      }

      case 'button': {
        const ButtonComponent = control.renderAs ? control.renderAs : Button;
        return (
          <ButtonComponent
            key={actionIndex}
            {...control?.config}
          >
            {control?.config?.label}
          </ButtonComponent>
        );
      }

      case 'textInput': {
        const onEnterFieldValue = (e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            control?.handleClick();
          }
        };

        return (
          <CmTextField
            key={actionIndex}
            zIndex={control?.config?.hidden ? -100 : 0}
            isNotUseError
            label={control?.config?.label}
            // value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              const value = e.target.value;
              control?.handleChangeValue?.(value);
            }}
            onKeyDown={onEnterFieldValue}
            endAdornmentChildren={
              <IconButton onClick={control?.handleClick}>
                <SearchIcon />
              </IconButton>
            }
          />
        );
      }

      case 'radio': {
        return (
          <RadioGroup
            row
            name={control.name}
            defaultValue={control.defaultValue}
            onChange={(e: SelectChangeEvent) => {
              const value = e.target.value;
              onChangeFilterClient?.({ ...filterClient, [control.name]: value === 'SERVICE' ? '' : value });
            }}
          >
            {control.options.map((option) => {
              return (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio size="small" />}
                  label={option.label}
                  sx={{ marginLeft: 0 }}
                />
              );
            })}
          </RadioGroup>
        );
      }

      default:
        return null;
    }
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}
    >
      <Stack
        direction="row"
        spacing={1}
        divider={
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
          />
        }
      >
        {filterConfig.primaryActions?.map((action: IFilterElementType, index: number) => {
          return renderActionControl(action, index);
        })}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
      >
        {filterConfig.advanceActions?.map((action: IFilterElementType, index: number) => {
          return renderActionControl(action, index);
        })}
      </Stack>
    </Stack>
  );
};

export default FilterPanel;
