import { forwardRef } from 'react';

import { Button, InputAdornment, Stack, SxProps, TextField, TextFieldProps, Theme, Typography } from '@mui/material';

import { ITextFieldButtonsConfig } from '@/utils/types/common';

import { CmDataInputWrapper, CmFieldLabel } from './styled';

type CmTextFieldProps = Omit<
  TextFieldProps,
  'error' | 'label' | 'helperText' | 'width' | 'margin' | 'variant' | 'zIndex'
> & {
  label?: string;
  errorMessage?: string;
  width?: string;
  labelWidth?: string;
  margin?: string;
  startAdornmentChildren?: React.ReactNode;
  endAdornmentChildren?: React.ReactNode;
  variant?: 'outlined' | 'standard' | 'filled';
  inputType?: string;
  zIndex?: number;
  renderAsText?: string | number;
  readOnly?: boolean;
  errorHeight?: string;
  isNotUseError?: boolean;
  labelFontSize?: string;
  labelPosition?: 'inline' | 'top';
  labelStyle?: SxProps<Theme>;
  hideLabel?: boolean;
  maxLength?: number;
  haveDefaultErrorSpace?: boolean;
  advanceButton?: ITextFieldButtonsConfig;
};

const CmTextField = forwardRef(
  (
    {
      label,
      errorMessage,
      width,
      margin,
      startAdornmentChildren,
      endAdornmentChildren,
      variant = 'outlined',
      fullWidth = true,
      size = 'small',
      renderAsText,
      readOnly,
      labelPosition = 'inline',
      labelStyle,
      labelWidth,
      maxLength = 256,
      haveDefaultErrorSpace = true,
      advanceButton,
      ...otherProps
    }: CmTextFieldProps,
    ref: any
  ) => {
    return (
      <CmDataInputWrapper
        width={width}
        margin={renderAsText && haveDefaultErrorSpace ? '0 0 20px 0' : margin}
        direction={labelPosition === 'inline' ? 'row' : 'column'}
        labelWidth={!!otherProps.hideLabel || labelPosition !== 'top' ? labelWidth : '0px'}
      >
        {!otherProps.hideLabel && (
          <CmFieldLabel
            sx={labelStyle}
            required={!!otherProps.required}
            width={labelWidth}
          >
            {label}
          </CmFieldLabel>
        )}
        <Stack
          direction={!advanceButton?.position || advanceButton?.position === 'right' ? 'row' : 'column'}
          width={'100%'}
          flex={1}
        >
          {!renderAsText ? (
            <TextField
              {...otherProps}
              spellCheck="false"
              ref={ref}
              fullWidth={fullWidth}
              size={size}
              error={!!errorMessage}
              helperText={
                haveDefaultErrorSpace && advanceButton?.position !== 'bottom' ? errorMessage || ' ' : errorMessage
              }
              InputProps={{
                startAdornment: startAdornmentChildren ? (
                  <InputAdornment position="start">
                    <>{startAdornmentChildren}</>
                  </InputAdornment>
                ) : undefined,

                endAdornment: endAdornmentChildren ? (
                  <InputAdornment position="end">
                    <>{endAdornmentChildren}</>
                  </InputAdornment>
                ) : undefined,

                readOnly: !!readOnly,
              }}
              inputProps={{ maxLength: maxLength }}
              hiddenLabel
            />
          ) : (
            <Typography
              variant="base"
              color={({ palette }) => palette.text.primary}
              padding="4px 0"
              sx={{ wordBreak: 'break-all' }}
            >
              {renderAsText}
            </Typography>
          )}
          {advanceButton && (
            <Stack
              direction={'row'}
              gap={advanceButton?.gap}
              paddingY={advanceButton?.position === 'bottom' ? '4px' : 0}
            >
              {advanceButton?.buttons?.map((btn, key) => (
                <Button
                  key={btn.label + key}
                  sx={{ height: '28px' }}
                  disabled={btn.disabled}
                  onClick={btn.onClick}
                  variant={btn.variant}
                  color={btn.color}
                >
                  {btn.label}
                </Button>
              ))}
            </Stack>
          )}
        </Stack>
      </CmDataInputWrapper>
    );
  }
);

export default CmTextField;
