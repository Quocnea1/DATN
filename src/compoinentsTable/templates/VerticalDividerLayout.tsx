import React, { ReactNode } from 'react';

import { Divider, IconButton, Paper, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

import { ReactComponent as PagePrevIcon } from '@/assets/images/PagePrevIcon.svg';

type VerticalDividerLayoutProps = {
  title: string;
  goBack?: () => void;
  leftWidth?: string;
  children: ReactNode;
};

const VerticalDividerLayout = ({ title, children, goBack, leftWidth = '35%' }: VerticalDividerLayoutProps) => {
  const [leftChildren, rightChildren] = React.Children.toArray(children);

  return (
    <Paper
      component={Stack}
      padding="0px 30px 20px"
      divider={<Divider />}
      width="100%"
    >
      <Box
        height="66px"
        alignItems="center"
        display="flex"
        gap="10px"
      >
        {!!goBack && (
          <IconButton
            onClick={goBack}
            sx={{
              padding: '5px',
            }}
          >
            <PagePrevIcon />
          </IconButton>
        )}
        <Typography variant="sidebarParent">{title}</Typography>
      </Box>
      <Stack
        divider={
          <Divider
            orientation="vertical"
            flexItem
          />
        }
        direction="row"
        gap={'20px'}
      >
        <Box
          width={leftWidth}
          display="flex"
          flexDirection="column"
          marginTop="20px"
        >
          {!!leftChildren && leftChildren}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          marginTop="20px"
          flex={1}
        >
          {!!rightChildren && rightChildren}
        </Box>
      </Stack>
    </Paper>
  );
};
export default VerticalDividerLayout;
