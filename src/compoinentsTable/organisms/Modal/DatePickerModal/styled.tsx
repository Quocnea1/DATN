import { styled } from '@mui/material';

export const DatePickerWrapper = styled('div')(({ theme }) => ({
  '& .react-datepicker': {
    border: 0,
    background: 'none',
    '& *': {
      margin: 0,
    },
    '& .react-datepicker__navigation': {
      width: '24px',
      height: '24px',
      top: 0,
      alignItems: 'center',
      justifyContent: 'center',

      '& .react-datepicker__navigation-icon::before': {
        borderColor: theme.palette.neutralLight[700],
        borderWidth: '1.5px 1.5px 0 0',
        width: '6px',
        height: '6px',
      },
    },
    // Calendar
    '& .react-datepicker__month-container': {
      marginBottom: '8px',
      // Header
      '& .react-datepicker__header': {
        background: 'none',
        border: 0,
        padding: 0,
        ...theme.typography.contentTitle,
        '& .react-datepicker__current-month': {
          marginBottom: '10px',
          fontSize: '15px',
        },
      },
      // Month
      '& .react-datepicker__month': {
        gap: '4px',
        display: 'flex',
        flexDirection: 'column',
        '& .react-datepicker__day--selected': {
          borderRadius: '100%',
          color: theme.palette.neutralLight[0],
          backgroundColor: theme.palette.button.primary,
          '&:hover': {
            background: theme.palette.blue,
          },
        },
        '& .react-datepicker__day:hover': {
          borderRadius: '100%',
        },
        '& .react-datepicker__day--keyboard-selected': {
          borderRadius: '100%',
        },
      },
      // Common
      '& .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name': {
        width: '32px',
        height: '32px',
        lineHeight: 2.5,
        color: theme.palette.text.primary,
      },
      '& .react-datepicker__day--outside-month': {
        cursor: 'default',
        visibility: 'hidden',
      },
    },
    // Time
    '& .react-datepicker__input-time-container': {
      fontSize: '13px',
      clear: 'unset',
      float: 'unset',
      '& .react-datepicker-time__caption': {
        display: 'none',
      },
      '& .react-datepicker-time__input-container, .react-datepicker-time__input': {
        display: 'block',
        width: '100%',
        margin: 0,
      },
      '& .rc-time-picker': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        '& input': {
          width: '100%',
        },
        '& a': { display: 'none' },
        '& svg': {
          position: 'absolute',
          right: '8px',
          fontSize: 18,
          color: theme.palette.icon.primary,
        },
      },
    },
  },
}));
