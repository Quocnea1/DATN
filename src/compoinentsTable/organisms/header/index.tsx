import { NavLink } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Stack, styled, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import { useLogout } from '@/apis/hooks/auth.hook';

import { rootMenus } from '@/routes/routes';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: theme.height.mainHeader,
  paddingRight: '30px',
  backgroundColor: theme.palette.neutralLight[800],
  boxShadow: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledRootMenu = styled(NavLink)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  fontSize: theme.typography.header.fontSize,
  padding: '18px 30px',
  textDecoration: 'none',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.neutralLight[700],
  '&.active, &:hover': {
    backgroundColor: theme.palette.blue[500],
  },
}));

const StyledLogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.neutralLight[700],
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.neutralDark[700],
  },
}));

function Header() {
  const { mutate: execLogout } = useLogout();
  return (
    <AppBar sx={{ display: 'flex', width: '100%', position: 'static' }}>
      <StyledToolbar disableGutters>
        <Stack
          direction="row"
          height="100%"
        >
          {rootMenus.map((route) => (
            <StyledRootMenu
              to={route.path}
              key={route.title}
            >
              {route.title}
            </StyledRootMenu>
          ))}
        </Stack>
        <StyledLogoutButton
          variant="contained"
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={() => {
            execLogout({});
          }}
        >
          Logout
        </StyledLogoutButton>
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
