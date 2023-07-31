import * as React from 'react';
import { useImperativeHandle, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Breakpoint, Dialog, DialogTitle, Grid, IconButton, Typography } from '@mui/material';

import { IDialogBaseRef } from '@/utils/types/common';

interface FormDialogProps {
  title: string;
  width?: Breakpoint;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const CmModal = React.forwardRef(
  ({ title, width, children, isOpen = false, onClose }: FormDialogProps, ref: React.Ref<IDialogBaseRef>) => {
    const [open, setOpen] = useState(isOpen);
    const [showAt, setShowAt] = useState<number>(new Date().getTime());

    const handleOpen = () => {
      setShowAt(new Date().getTime());
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      onClose?.();
    };

    useImperativeHandle(ref, () => {
      return {
        show: handleOpen,
        hide: handleClose,
      };
    });

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
        <React.Fragment key={`Dialog-show-at-${showAt}`}>{children}</React.Fragment>
      </Dialog>
    );
  }
);

export default CmModal;
