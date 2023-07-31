import * as React from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem } from '@mui/material';

import { IPlainObject } from '@/utils/types/common';

export interface ButtonMenuOption<TData> {
  label: string;
  action: (data?: TData) => void;
}
export interface ButtonMenuProps<TData> {
  buttonLabel: string;
  options: ButtonMenuOption<TData>[];
  callbackData?: TData;
  onButtonClick?: (data?: TData) => void;
}

const CmButtonDropdownMenu = <CallbackDataType extends IPlainObject = IPlainObject>({
  buttonLabel,
  options,
  callbackData,
  onButtonClick,
}: ButtonMenuProps<CallbackDataType>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    onButtonClick?.(callbackData);
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event?: unknown) => {
    (event as React.MouseEvent<HTMLButtonElement>).stopPropagation();
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        color="secondary"
        variant="outlined"
      >
        {buttonLabel}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {options.map(({ label, action }) => {
          return (
            <MenuItem
              key={label}
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                action(callbackData);
                handleClose(event);
              }}
            >
              {label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default CmButtonDropdownMenu;
