import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { AccessTime } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, Divider } from '@mui/material';
import { ko } from 'date-fns/esm/locale';
import moment, { Moment } from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import { DatePickerWrapper } from '@/components/organisms/Modal/DatePickerModal/styled';

import { convertToFullDateTime } from '@/utils/dateUtil';
import { DateFormatEnum } from '@/utils/types/common';

type CustomTimeInputProps = {
  date: Date;
  onChangeTime: (date: Date) => void;
};

const CustomTimeInput = ({ date, onChangeTime }: CustomTimeInputProps) => {
  const handleChange = (dateTime: Moment) => {
    const timeInDateFormat = dateTime.toDate();
    onChangeTime(timeInDateFormat);
  };

  return (
    <TimePicker
      showSecond
      value={moment(date)}
      inputIcon={<AccessTime />}
      onChange={handleChange}
    />
  );
};

type DatePickerModalProps = {
  value: string;
  onChange: (value: string) => void;
  format: DateFormatEnum;
  onClose: () => void;
};

const DatePickerModal = ({ value, onChange, format, onClose }: DatePickerModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(value));

  const onChangeDateTime = (date: Date) => {
    setSelectedDate(date);
  };

  const onChangeTime = (dateTime: Date) => {
    setSelectedDate(dateTime);
  };

  const onSelectDateTime = () => {
    onChange(convertToFullDateTime(selectedDate));
  };

  return (
    <Dialog
      open
      maxWidth="lg"
    >
      <DialogContent sx={{ overflow: 'hidden', marginTop: '4px' }}>
        <DatePickerWrapper>
          <DatePicker
            locale={ko}
            selected={selectedDate}
            onChange={onChangeDateTime}
            dateFormat={format}
            showTimeInput
            customTimeInput={
              <CustomTimeInput
                date={selectedDate}
                onChangeTime={onChangeTime}
              />
            }
            inline
          />
        </DatePickerWrapper>
        <Divider sx={{ marginTop: '16px' }} />
      </DialogContent>

      <DialogActions>
        <Button
          color="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button onClick={onSelectDateTime}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DatePickerModal;
