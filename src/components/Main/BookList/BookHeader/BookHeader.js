import React from 'react';
import { TableRow, TableCell, TableSortLabel } from '@material-ui/core';

const BookHeader = props => {
  const { onSortingChoose, sortBy, sortDir } = props;
  return <TableRow>
    <TableCell>Image</TableCell>
    <TableCell>
      <TableSortLabel
        active={sortBy === 'name'}
        direction={sortDir || 'asc'}
        onClick={e => onSortingChoose('name')}>
        Name
      </TableSortLabel>
    </TableCell>
    <TableCell>Genre</TableCell>
    <TableCell>Date</TableCell>
    <TableCell>
      <TableSortLabel
        active={sortBy === 'authorName'}
        direction={sortDir || 'asc'}
        onClick={e => onSortingChoose('authorName')}>
        Author
      </TableSortLabel>
    </TableCell>
  </TableRow>;
};

export default BookHeader;