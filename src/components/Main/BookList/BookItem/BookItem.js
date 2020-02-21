import React from 'react';
import { TableRow, TableCell, Avatar } from "@material-ui/core";

const BookItem = props => {
  const { book } = props;

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }

  return <TableRow { ...props }>
    <TableCell><Avatar src={book.image}/></TableCell>
    <TableCell>{book.name}</TableCell>
    <TableCell>{book.indicated ? <strong>{book.genre}</strong> : book.genre}</TableCell>
    <TableCell>{formatDate(book.date)}</TableCell>
    <TableCell>{book.authorName} | {book.authorGender}</TableCell>
  </TableRow>;
};

export default BookItem;