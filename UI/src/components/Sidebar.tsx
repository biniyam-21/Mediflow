import React, { useState } from 'react';
import { createStyles, Navbar, getStylesRef, rem } from '@mantine/core';
import {
  IconHome2,
  IconUser,
  IconDeviceDesktopAnalytics,
  IconSettings,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

interface SidebarItem {
  link: string;
  label: string;
  icon: React.ElementType;
}

const navData: SidebarItem[] = [
  { link: '/', label: 'Home', icon: IconHome2 },
  { link: '/vendordashboard', label: 'Offers', icon: IconReceipt2 },
  { link: '/admin', label: 'Update Inventory', icon: IconDeviceDesktopAnalytics },
  { link: '', label: 'Profile', icon: IconUser },
  { link: '', label: 'Settings', icon: IconSettings },
];

interface SidebarProps {
  span?: number;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const links = navData.map((item) => {
    const isActive = location.pathname === item.link;
    return (
      <a
        className={cx(classes.link, { [classes.linkActive]: isActive })}
        href={item.link}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          if (item.link) {
            navigate(item.link);
          }
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    );
  });

  return (
    <Navbar height={750} width={{ sm: 280 }} p="md">
      <Navbar.Section grow>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={handleLogout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
