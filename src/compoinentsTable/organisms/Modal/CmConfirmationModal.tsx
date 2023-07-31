import * as React from 'react';
import { useImperativeHandle, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { IDialogBaseRef } from '@/utils/types/common';

interface FormDialogProps {
  title: string;
  width?: Breakpoint;
  children?: React.ReactNode;
  confirmedLabel?: string;
  cancelLabel?: string;
  confirmBottomText?: string;
  confirmedButtonColor?: 'inherit' | 'secondary' | 'primary' | 'success' | 'error' | 'info' | 'warning';
}

type CallbackType = () => void;

const CmConfirmationModal = React.forwardRef(
  (
    {
      title,
      width,
      confirmBottomText = '',
      children,
      cancelLabel = 'Cancel',
      confirmedLabel = 'Delete',
      confirmedButtonColor = 'error',
    }: FormDialogProps,
    ref: React.Ref<IDialogBaseRef>
  ) => {
    const [open, setOpen] = useState(false);

    const callbackRef = React.useRef<CallbackType>();

    const handleOpen = (callbackFn?: () => void) => {
      setOpen(true);
      callbackRef.current = callbackFn;
    };

    const handleClose = () => {
      setOpen(false);
    };

    useImperativeHandle(ref, () => {
      return {
        show: handleOpen,
        hide: handleClose,
      };
    });

    const handleSubmitBtn = () => {
      callbackRef.current?.();
      handleClose();
    };
    const handleCloseBtn = () => {
      setOpen(false);
    };

    return (
      <Dialog
        open={open}
        maxWidth={width || 'sm'}
        fullWidth
        onClose={handleClose}
      >
        <DialogTitle>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="dialogTitle">{title}</Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Stack
            gap={1}
            direction="row"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Typography
              variant="base"
              flex={1}
            >
              {confirmBottomText}
            </Typography>
            <Stack
              gap={1}
              direction="row"
            >
              <Button
                onClick={handleCloseBtn}
                color="secondary"
              >
                {cancelLabel}
              </Button>
              <Button
                onClick={handleSubmitBtn}
                color={confirmedButtonColor}
              >
                {confirmedLabel}
              </Button>
            </Stack>
          </Stack>
        </DialogActions>
      </Dialog>
    );
  }
);

export default CmConfirmationModal;
