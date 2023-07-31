import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Stack, SxProps, Theme } from '@mui/material';

import { CmDataInputWrapper, CmFieldLabel } from '@/components/atoms/DataInput/styled';

import { IOption } from '@/utils/types/common';

export type RadioItemProps<TValue extends string | number | boolean> = IOption<TValue> & {
  disabled?: boolean;
};

type RadioGroupProps<TValue extends string | number | boolean> = {
  label?: string;
  labelWidth?: string;
  data: RadioItemProps<TValue>[];
  value?: TValue;
  onRadioChange: (value: TValue) => void;
  errorMessage?: string;
  disabledAll?: boolean;
  margin?: string;
  errorHeight?: string;
  isNotUseError?: boolean;
  required?: boolean;
  labelPosition?: 'inline' | 'top';
  labelStyle?: SxProps<Theme>;
  fullWidth?: boolean;
  haveDefaultErrorSpace?: boolean;
};

function CmRadioGroup<TValue extends string | number | boolean>({
  label,
  labelWidth,
  data,
  value,
  onRadioChange,
  errorMessage,
  disabledAll,
  margin,
  required,
  labelPosition = 'inline',
  labelStyle,
  fullWidth = true,
  haveDefaultErrorSpace = true,
}: RadioGroupProps<TValue>) {
  return (
    <CmDataInputWrapper
      margin={margin}
      direction={labelPosition === 'inline' ? 'row' : 'column'}
      labelWidth={labelWidth}
    >
      <CmFieldLabel
        sx={labelStyle}
        required={!!required}
        width={labelWidth}
      >
        {label}
      </CmFieldLabel>
      <Stack flex={1}>
        <FormControl
          onChange={(e) => {
            onRadioChange((e.target as HTMLInputElement).value as TValue);
          }}
          fullWidth={fullWidth}
        >
          <RadioGroup
            row
            aria-labelledby={`radio-buttons-group-label-${label}`}
            name={`radio-buttons-group-${label}`}
            value={value}
            sx={{ gap: 1 }}
          >
            {data.length &&
              data.map((item, idx) => (
                <FormControlLabel
                  key={item.value.toString() + idx}
                  value={item.value}
                  sx={{
                    marginLeft: 0,
                    alignItems: 'center',
                  }}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        height: '28px',
                        width: '28px',
                      }}
                      checked={item.value === value}
                    />
                  }
                  label={item.label}
                  disabled={disabledAll || !!item.disabled}
                />
              ))}
          </RadioGroup>
        </FormControl>
        {(errorMessage || haveDefaultErrorSpace) && <FormHelperText>{errorMessage || ' '}</FormHelperText>}
      </Stack>
    </CmDataInputWrapper>
  );
}

export default CmRadioGroup;
