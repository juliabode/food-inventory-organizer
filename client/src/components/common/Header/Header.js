import React from 'react';
import clsx from 'clsx';
import { Trans } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import styles from './header.module.scss';

const Header = (props) => {
  const location = useLocation();
  const title = location.pathname.substring(1)
    ? location.pathname.substring(1)
    : 'dashboard';

  return (
    <AppBar
      position="absolute"
      className={clsx(styles.appBar, props.open && styles.appBarShift)}
    >
      <Toolbar className={styles.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            props.setOpen(true);
          }}
          className={clsx(
            styles.menuButton,
            props.open && styles.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={styles.title}
        >
          <Trans>title.{title}</Trans>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
