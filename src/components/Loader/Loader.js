import React from 'react';
import { CircularProgress } from '@material-ui/core';
import classes from './Loader.module.scss';

const Loader = (props) => {
  return (
    props.loading ?
      <div className={classes.Loader}>
        <CircularProgress className="text-center" color="secondary"/>
        {props.text && <div className={classes.LoaderText}>{props.text}</div>}
      </div>
    :
      props.children
  );
};

export default Loader;