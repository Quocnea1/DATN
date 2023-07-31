import { SxProps, Theme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import * as dayjs from 'dayjs';

import { CmDataInputWrapper, CmFieldLabel } from '@/components/atoms/DataInput/styled';

import { convertDateWithFormat } from '@/utils/dateUtil';

type DatePickerProps = {
  label?: string;
  labelWidth?: string;
  value?: string;
  onChange?: (value: string) => void;
  errorMessage?: string;
  disabledAll?: boolean;
  margin?: string;
  errorHeight?: string;
  isNotUseError?: boolean;
  required?: boolean;
  labelPosition?: 'inline' | 'top';
  format?: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss';
  fullWidth?: boolean;
  labelStyle?: SxProps<Theme>;
  haveDefaultErrorSpace?: true;
};

function CmDatePicker({
  label,
  labelWidth,
  value,
  onChange,
  errorMessage,
  margin,
  required = false,
  labelPosition = 'inline',
  labelStyle,
  fullWidth = true,
  format = 'YYYY-MM-DD',
  haveDefaultErrorSpace = true,
}: DatePickerProps) {
  const onDateChange = (date: string | null) => {
    const dateTime = convertDateWithFormat(date || '', format);
    onChange?.(dateTime);
  };

  return (
    <CmDataInputWrapper
      margin={margin}
      direction={labelPosition === 'inline' ? 'row' : 'column'}
    >
      <CmFieldLabel
        sx={labelStyle}
        required={!!required}
        width={labelWidth}
      >
        {label}
      </CmFieldLabel>
      <DatePicker
        format={format}
        value={dayjs(value) as unknown as string}
        sx={{ flex: 1 }}
        slotProps={{
          textField: {
            fullWidth: fullWidth,
            helperText: haveDefaultErrorSpace ? errorMessage || ' ' : errorMessage,
            error: !!errorMessage,
          },
        }}
        onChange={onDateChange}
      />
    </CmDataInputWrapper>
  );
}

export default CmDatePicker;
