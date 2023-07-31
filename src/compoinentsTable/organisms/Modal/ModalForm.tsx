import * as React from 'react';

import { Button, DialogActions, DialogContent, Stack } from '@mui/material';

export interface ModalFormProps {
  children?: React.ReactNode;
  handleCloseBtn?: () => void;
  handleSubmitBtn?: () => void;
  closeBtnLabel?: string;
  submitBtnLabel?: string;
  advanceFooterRender?: React.ReactNode;
  isDisableSubmitButton?: boolean;
  confirmButtonColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const ModalForm = ({
  children,
  handleCloseBtn,
  handleSubmitBtn,
  closeBtnLabel = 'Cancel',
  submitBtnLabel = 'OK',
  advanceFooterRender,
  isDisableSubmitButton = false,
  confirmButtonColor,
}: ModalFormProps) => {
  return (
    <React.Fragment>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Stack width="100%">{advanceFooterRender}</Stack>
        <Stack
          gap={1}
          direction="row"
        >
          {handleCloseBtn && (
            <Button
              onClick={handleCloseBtn}
              color="secondary"
            >
              {closeBtnLabel}
            </Button>
          )}
          {handleSubmitBtn && (
            <Button
              disabled={isDisableSubmitButton}
              onClick={handleSubmitBtn}
              color={confirmButtonColor}
            >
              {submitBtnLabel}
            </Button>
          )}
        </Stack>
      </DialogActions>
    </React.Fragment>
  );
};

export default ModalForm;
