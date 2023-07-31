import { NavLink } from 'react-router-dom';

import { Box, Breadcrumbs, Grid, ListItemButton, ListItemIcon, styled } from '@mui/material';

import theme from '@/theme';

const GridContainer = styled(Grid)({
  minWidth: '1600px',
  minHeight: 'calc(var(--vh, 1vh) * 100)',
});

const SidebarWrapper = styled('div')({
  minHeight: '100vh',
  width: '240px',
  backgroundColor: theme.palette.background.default,
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
});

const ImageWrapper = styled('h1')({
  height: ' 54px',
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  lineHeight: 0,
  background: '#292b31',
});

const BreadcrumbsStyled = styled(Breadcrumbs)({
  '.MuiBreadcrumbs-li': {
    ':last-child a ': {
      color: '#0485E3',
    },
    '&.MuiBreadcrumbs-separator ': {
      color: '#9EA4AC',
    },
    a: {
      fontSize: '12px',
      color: theme.palette.text.primary,
      textDecoration: 'none',
      cursor: 'pointer',
      ':hover': {
        textDecoration: 'underline',
      },
    },
  },
});

const BreadcrumbsWrapper = styled(Box)({
  padding: '30px 20px',
  backgroundColor: '#E8EBEE',
});

const CmBreadcrumbsStyle = styled('div')`
  * {
    font: '13px';
  }
`;

const ListItemButtonParentStyled = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '5px',
  fontWeight: theme.typography.fontWeightBold,
  height: '38px',
  '&.Mui-selected, &:hover': {
    backgroundColor: theme.palette.blue[50],
  },
  '.MuiTypography-root': {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography?.sidebarParent?.fontSize || '15px',
  },
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  '.MuiListItemIcon-root': {
    visibility: 'hidden',
  },
  '&.active': {
    color: theme.palette.primary.main,
    '.Mui-selected': {
      backgroundColor: 'transparent',
    },
    '.MuiListItemIcon-root': {
      visibility: 'visible',
    },
  },
  '&:hover': {
    color: theme.palette.blue[300],
    '.MuiListItemIcon-root': {
      visibility: 'visible',
    },
  },
  '.MuiTypography-root': {
    fontSize: theme.typography.base.fontSize,
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  marginRight: '15px',
}));

export {
  BreadcrumbsStyled,
  BreadcrumbsWrapper,
  CmBreadcrumbsStyle,
  GridContainer,
  ImageWrapper,
  ListItemButtonParentStyled,
  SidebarWrapper,
  StyledListItemIcon,
  StyledNavLink,
};
