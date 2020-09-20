import React from 'react';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import { mainListItems } from '../listItems';
import styles from './navigation.module.scss';

const Navigation = (props) => {
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(styles.drawerPaper, !props.open && styles.drawerPaperClose),
      }}
      open={props.open}
    >
      <div className={styles.toolbarIcon}>
        <IconButton onClick={() => props.setOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
    </Drawer>
  );
};

export default Navigation;
