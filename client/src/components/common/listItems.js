import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trans } from 'react-i18next';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import KitchenIcon from '@material-ui/icons/Kitchen';

function ListItemLink(props) {
  return (
    <NavLink
      to={props.href}
      style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87' }}
    >
      <ListItem button {...props} />
    </NavLink>
  );
}

export const mainListItems = (
  <div>
    <ListItemLink href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary=<Trans>title.dashboard</Trans> />
    </ListItemLink>
    <ListItemLink href="/freezer">
      <ListItemIcon>
        <KitchenIcon />
      </ListItemIcon>
      <ListItemText primary=<Trans>title.freezer</Trans> />
    </ListItemLink>
  </div>
);
