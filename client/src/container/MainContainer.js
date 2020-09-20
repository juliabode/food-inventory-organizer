import React, { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';
import Navigation from '../components/common/Navigation/Navigation';
import styles from './mainContainer.module.scss';

const MainContainer = (props) => {
  const [open, setOpen] = useState(true);
  const date = Date();

  return (
    <div className={styles.root}>
      <CssBaseline />
      <Header open={open} setOpen={setOpen} title={'dashboard'} />
      <Navigation open={open} setOpen={setOpen} />
      <main className={styles.content}>
        <div className={styles.appBarSpacer} />
        {props.children}
        <Box pt={4}>
          <Footer />
          {date.toString()}
        </Box>
      </main>
    </div>
  );
};

export default MainContainer;
