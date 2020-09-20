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
      exact
      to={props.href}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'white',
        margin: '10px 15px 0',
        padding: '10px 15px',
        transition: 'all 300ms linear',
        borderRadius: '3px',
      }}
      activeStyle={{
        boxShadow:
          '0 12px 20px -10px rgba(0, 172, 193,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(0, 172, 193,.2)',
        backgroundColor: '#00acc1',
      }}
    >
      <ListItem button {...props} style={{ padding: '0' }} />
    </NavLink>
  );
}

export const mainListItems = (
  <div>
    <ListItemLink href="/">
      <ListItemIcon>
        <DashboardIcon
          style={{ color: 'white', minWidth: '36px', marginRight: '30px' }}
        />
      </ListItemIcon>
      <ListItemText primary=<Trans>title.dashboard</Trans> />
    </ListItemLink>
    <ListItemLink href="/freezer">
      <ListItemIcon>
        <KitchenIcon
          style={{ color: 'white', minWidth: '36px', marginRight: '30px' }}
        />
      </ListItemIcon>
      <ListItemText primary=<Trans>title.freezer</Trans> />
    </ListItemLink>
  </div>
);
