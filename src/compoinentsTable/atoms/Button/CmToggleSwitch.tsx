import { useEffect, useRef } from 'react';

import { Box, SxProps, Theme, Typography } from '@mui/material';

import { CmDataInputWrapper, CmFieldLabel } from '@/components/atoms/DataInput/styled';

interface ToggleOption {
  label: string;
  value: string;
}
interface ToggleSwitchProps {
  leftLabelOption: ToggleOption;
  rightLabelOption: ToggleOption;
  width?: string;
  margin?: string;
  label?: string;
  labelWidth?: string;
  labelStyle?: SxProps<Theme>;
  labelPosition?: 'inline' | 'top';
  hideLabel?: boolean;
  defaultValue?: string;
  onChange: (data: string) => void;
  value: string;
}

const CmToggleSwitch = (props: ToggleSwitchProps) => {
  const {
    label,
    labelStyle,
    labelWidth,
    margin,
    width,
    hideLabel,
    labelPosition = 'inline',
    leftLabelOption,
    rightLabelOption,
    value,
    onChange,
  } = props;

  const slideRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    {
      const a = leftRef?.current?.getBoundingClientRect().width;
      if (value === rightLabelOption.value) {
        slideRef?.current?.setAttribute(
          'style',
          `-webkit-transform: translateX(${a?.toFixed(2)}px);  -ms-transform: translateX(${a?.toFixed(
            2
          )}px);  transform: translateX(${a?.toFixed(2)}px)`
          // 'right: 2px; left: auto;'
        );
      } else
        slideRef?.current?.setAttribute(
          'style',
          '-webkit-transform: translateX(0);  -ms-transform: translateX(0);  transform: translateX(0)'
          // 'left: 2px; right: auto;'
        );
    }
  }, [value]);

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
        >
          {label}
        </CmFieldLabel>
      )}
      <Box
        position="relative"
        display="flex"
      >
        <Box
          height="28px"
          flexDirection="row"
          bgcolor={(theme) => theme.palette.layer?.['04']}
          borderRadius="4px"
          padding="2px"
          width="fit-content"
          position="relative"
          display="flex"
        >
          <Typography
            color={(theme) => theme.palette.text.secondary}
            padding="2px 16px"
            variant="base"
            alignSelf="center"
            onClick={() => {
              onChange(leftLabelOption.value);
            }}
            ref={leftRef}
          >
            {leftLabelOption.label}
          </Typography>
          <Typography
            color={(theme) => theme.palette.text.secondary}
            padding="2px 16px"
            variant="base"
            ref={rightRef}
            onClick={() => {
              onChange(rightLabelOption.value);
            }}
          >
            {rightLabelOption.label}
          </Typography>
          <Typography
            top="2px"
            left="2px"
            position="absolute"
            borderRadius="2px"
            color={(theme) => theme.palette.text.primary}
            bgcolor="#fff"
            padding="2px 16px"
            variant="base"
            zIndex={1}
            sx={{
              WebkitTransition: '.4s',
              transition: '.4s',
            }}
            ref={slideRef}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </CmDataInputWrapper>
  );
};
export default CmToggleSwitch;
