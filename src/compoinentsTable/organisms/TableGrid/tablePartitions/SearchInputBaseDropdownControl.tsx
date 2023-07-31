import { ChangeEvent, useState } from 'react';

import { Close, SearchOutlined } from '@mui/icons-material';
import {
  Button,
  Collapse,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
} from '@mui/material';

import { getObjectValuesByKey } from '@/utils/arrayUtil';
import { DropdownOptionType, FilterFormType } from '@/utils/types/table';

type SearchInputBaseDropdownControlProps = {
  options: DropdownOptionType[];
  defaultValue: string;
  onSearchChange?: (value: any) => void;
  filterState: FilterFormType;
  isAlwaysOpenFilter?: boolean;
  isChangeOnEnter?: boolean;
};

const SearchInputBaseDropdownControl = ({
  options = [],
  defaultValue = '',
  onSearchChange,
  filterState,
  isAlwaysOpenFilter = false,
  isChangeOnEnter = false,
}: SearchInputBaseDropdownControlProps) => {
  const [fieldNameSelected, setFieldNameSelected] = useState<string>(defaultValue);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isVisibleControl, setIsVisibleControl] = useState<boolean>(isAlwaysOpenFilter);
  const [isFocusInputControl, setIsFocusInputControl] = useState<boolean>(false);
  const isVisibleCloseIcon = isFocusInputControl && searchValue;

  const handleSelectFieldName = (e: SelectChangeEvent) => {
    const fieldName = e.target.value;
    setFieldNameSelected(fieldName);
    const fieldNameGroups = getObjectValuesByKey(options, 'value');
    for (const key of fieldNameGroups) {
      delete filterState[key];
    }
    !isChangeOnEnter && onSearchChange?.({ ...filterState, [fieldName]: searchValue });
  };

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    const fieldNameGroups = getObjectValuesByKey(options, 'value');
    for (const key of fieldNameGroups) {
      delete filterState[key];
    }
    !isChangeOnEnter && onSearchChange?.({ ...filterState, [fieldNameSelected]: value });
  };

  const handleClearSearch = () => {
    setSearchValue('');
    !isChangeOnEnter && onSearchChange?.({ ...filterState, [fieldNameSelected]: '' });
  };

  const toggleShowControl = () => {
    setIsVisibleControl(!isVisibleControl);
  };

  const toggleFocusInputControl = () => {
    setTimeout(() => {
      setIsFocusInputControl(!isFocusInputControl);
    }, 200);
  };

  const onEnterFieldValue = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearchChange?.({ [fieldNameSelected]: searchValue });
    }
  };

  return (
    <Stack
      direction="row"
      sx={{ height: (theme) => theme.height.normal }}
    >
      <Tooltip title={isVisibleControl ? 'Close filter' : 'Open filter'}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={toggleShowControl}
          sx={{
            borderBottomRightRadius: !isVisibleControl ? '4px' : 0,
            borderTopRightRadius: !isVisibleControl ? '4px' : 0,
          }}
        >
          <SearchOutlined sx={{ fontSize: (theme) => theme.iconSize.lg }} />
        </Button>
      </Tooltip>
      <Collapse
        orientation="horizontal"
        in={isVisibleControl}
      >
        <Stack direction="row">
          <Select
            onChange={handleSelectFieldName}
            value={fieldNameSelected}
            size="small"
            sx={{
              width: '180px',
              borderRadius: 0,
              '&:not(.Mui-focused) > fieldset': { borderRightWidth: 0, borderLeftWidth: 0 },
            }}
          >
            {options.map((item, index) => {
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
          <OutlinedInput
            sx={{
              width: '300px',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            type="text"
            size="small"
            onKeyDown={onEnterFieldValue}
            onChange={handleSearchTextChange}
            value={searchValue}
            onFocus={toggleFocusInputControl}
            onBlur={toggleFocusInputControl}
            endAdornment={
              isVisibleCloseIcon ? (
                <IconButton
                  size="small"
                  sx={(theme) => ({
                    height: theme.iconSize.base,
                    width: theme.iconSize.base,
                    padding: 0,
                  })}
                  onClick={handleClearSearch}
                >
                  <Close
                    sx={(theme) => ({
                      height: theme.iconSize.base,
                      width: theme.iconSize.base,
                    })}
                  />
                </IconButton>
              ) : (
                <></>
              )
            }
          />
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default SearchInputBaseDropdownControl;
