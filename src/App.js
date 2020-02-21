import React from 'react';
import classes from './App.module.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import theme from './theme/theme.config';
import { ThemeProvider } from '@material-ui/core';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.App}>
        <Header className={classes.Header}></Header>
        <Main className={classes.Main}></Main>
        <Footer className={classes.Footer}></Footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
