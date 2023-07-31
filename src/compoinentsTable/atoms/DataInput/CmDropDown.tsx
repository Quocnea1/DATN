import { FormControl, FormHelperText, MenuItem, Select, SelectProps, Stack, SxProps, Theme } from '@mui/material';

import { CmDataInputWrapper, CmFieldLabel } from '@/components/atoms/DataInput/styled';

import { DropdownType } from '@/utils/types/common';

type CmDropdownProps = Omit<SelectProps, 'fullWidth' | 'error' | 'margin' | 'multiple' | 'helperText'> & {
  data: DropdownType[];
  width?: string;
  margin?: string;
  labelWidth?: string;
  multiple?: boolean;
  errorMessage?: string;
  labelFontSize?: string;
  fullWidth?: boolean;
  isNotUseError?: boolean;
  errorHeight?: string;
  hideLabel?: boolean;
  readOnly?: boolean;
  labelPosition?: 'inline' | 'top';
  labelStyle?: SxProps<Theme>;
  haveDefaultErrorSpace?: boolean;
  defaultMenuItem?: DropdownType;
  isUseEmptyValue?: boolean;
};

const CmDropdown = (props: CmDropdownProps) => {
  const {
    label,
    data,
    disabled,
    margin,
    width,
    labelWidth,
    multiple = false,
    errorMessage,
    fullWidth = true,
    hideLabel,
    readOnly,
    labelPosition = 'inline',
    haveDefaultErrorSpace = true,
    labelStyle,
    defaultMenuItem,
    isUseEmptyValue = false,
    ...otherProps
  } = props;

  return (
    <CmDataInputWrapper
      width={width}
      margin={margin}
      direction={labelPosition === 'inline' ? 'row' : 'column'}
      labelWidth={labelPosition === 'inline' && !hideLabel && labelPosition === 'inline' ? labelWidth : '0px'}
    >
      {!hideLabel && (
        <CmFieldLabel
          sx={labelStyle}
          width={labelWidth}
          required={!!otherProps?.required}
        >
          {label}
        </CmFieldLabel>
      )}

      <Stack flex={1}>
        <FormControl
          error={!!errorMessage}
          size="small"
          fullWidth={fullWidth}
        >
          <Select
            {...otherProps}
            labelId={`label-select-${label}`}
            spellCheck="false"
            error={!!errorMessage}
            displayEmpty
            multiple={multiple}
            disabled={disabled}
            readOnly={!!readOnly}
            defaultValue={otherProps.defaultValue || (defaultMenuItem && defaultMenuItem.value)}
          >
            {!!defaultMenuItem && (
              <MenuItem
                key={defaultMenuItem.value.toString() + 'defaultMenuItem'}
                value={defaultMenuItem.value || ''}
                style={{ fontSize: 13 }}
                disabled
                sx={{ '&.Mui-disabled': { bgcolor: 'transparent' } }}
              >
                {defaultMenuItem.label}
              </MenuItem>
            )}
            {!!data?.length &&
              data?.map((item, index) => {
                if (isUseEmptyValue || (item.label && item.value !== '')) {
                  return (
                    <MenuItem
                      key={item.value.toString() + index}
                      value={item.value || ''}
                      style={{ fontSize: 13 }}
                    >
                      {item.label}
                    </MenuItem>
                  );
                }
              })}
          </Select>
          {(errorMessage || haveDefaultErrorSpace) && <FormHelperText>{errorMessage || ' '}</FormHelperText>}
        </FormControl>
      </Stack>
    </CmDataInputWrapper>
  );
};
export default CmDropdown;
