import React from 'react';
import BookList from './BookList/BookList';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const Main = (props) => {
  return <main id="main" {...props}>
    <ErrorBoundary>
      <BookList/>
    </ErrorBoundary>
  </main>;
};

export default Main;