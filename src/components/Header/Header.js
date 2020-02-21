import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography } from '@material-ui/core';

const Header = (props) => {
  return <AppBar {...props} position="static">
    <Toolbar>
      <Typography variant="h6">Book App</Typography>
    </Toolbar>
  </AppBar>;
};

export default Header;