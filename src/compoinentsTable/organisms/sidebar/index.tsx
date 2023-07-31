import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Circle } from '@mui/icons-material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Collapse, ListItemButton, ListItemText, useTheme } from '@mui/material';
import List from '@mui/material/List';

import {
  ImageWrapper,
  ListItemButtonParentStyled,
  SidebarWrapper,
  StyledListItemIcon,
  StyledNavLink,
} from '@/components/organisms/sidebar/styled';

import { RouteItem } from '@/utils/types/route';

import logo from '@/assets/images/logo.png';
import { configRoutes, operationRoutes } from '@/routes/routes';
import { filterRoutesBasePermission, RootMenu } from '@/routes/utils';

const Sidebar = ({ rootMenu }: { rootMenu: RootMenu }) => {
  const theme = useTheme();
  const { pathname } = useLocation();

  const [menu, setMenu] = useState<RouteItem[]>([]);

  const [expandedMenuId, setExpandedMenuId] = useState<string>();

  const onSelectParentMenu = (menu: RouteItem) => {
    const menuId = menu.id || '';
    setExpandedMenuId(menuId === expandedMenuId ? 'none' : menuId);
  };

  const getMenuListBaseRootMenu = (): RouteItem[] => {
    switch (rootMenu) {
      case RootMenu.OPERATION:
        return filterRoutesBasePermission(operationRoutes);
      case RootMenu.CONFIGURATION:
        return filterRoutesBasePermission(configRoutes);
      default:
        return [];
    }
  };

  const setMenuList = () => {
    const menu: RouteItem[] = getMenuListBaseRootMenu();

    setMenu(menu);

    let parentMenuSelected = menu.find((parentMenu) =>
      parentMenu.child?.find((childMenu) => childMenu.fullPath === pathname)
    );

    if (!parentMenuSelected) {
      parentMenuSelected = menu[0];
    }

    setExpandedMenuId(parentMenuSelected?.id || '');
  };

  useEffect(() => {
    setMenuList();
  }, [rootMenu]);

  const renderTreeChild = (child: RouteItem, idx?: number) => {
    if (child.isHidden) {
      return;
    }
    return (
      <List
        disablePadding
        key={idx}
      >
        <StyledNavLink to={child.fullPath || ''}>
          <ListItemButton sx={{ paddingX: '0' }}>
            <StyledListItemIcon>
              <Circle
                sx={(theme) => ({
                  fontSize: theme.iconSize.xs,
                })}
              />
            </StyledListItemIcon>
            <ListItemText
              primary={child.label}
              sx={{ ...theme.typography.base }}
            />
          </ListItemButton>
        </StyledNavLink>
      </List>
    );
  };

  return (
    <SidebarWrapper>
      <ImageWrapper>
        <img
          src={logo}
          alt="logo"
          width={'164px'}
        />
      </ImageWrapper>
      <List sx={{ paddingTop: 0 }}>
        {menu.map((item) => (
          <Box
            key={item.id}
            sx={{ padding: '7px' }}
          >
            <ListItemButtonParentStyled
              key={item.id}
              onClick={() => onSelectParentMenu(item)}
              selected={expandedMenuId === item.id}
            >
              <StyledListItemIcon>{item.icon}</StyledListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ ...theme.typography.sidebarParent }}
              />
              {expandedMenuId === item.id ? (
                <ExpandLess
                  sx={(theme) => ({
                    fontSize: theme.iconSize.sm,
                  })}
                />
              ) : (
                <ExpandMore
                  sx={(theme) => ({
                    fontSize: theme.iconSize.sm,
                  })}
                />
              )}
            </ListItemButtonParentStyled>
            <Collapse
              sx={{ paddingX: '7px' }}
              in={expandedMenuId === item.id}
              timeout="auto"
              unmountOnExit
            >
              {item.child && item.child.map((child, idx) => renderTreeChild(child, idx))}
            </Collapse>
          </Box>
        ))}
      </List>
    </SidebarWrapper>
  );
};

export default Sidebar;
