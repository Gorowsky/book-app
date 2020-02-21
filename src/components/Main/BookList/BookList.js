import Axios from 'axios';
import { TableContainer, TableHead, TableBody, Table, TablePagination } from '@material-ui/core';
import classes from './BookList.module.scss';
import { getBookPage, mapToNextSortDir } from '../../../services/pagination';
import React, { Fragment, useState, useEffect } from 'react';
import Loader from '../../Loader/Loader';
import BookItem from './BookItem/BookItem';
import BookHeader from './BookHeader/BookHeader';
import BookFilter from './BookFilter/BookFilter';
import { mapBookFromDomain } from '../../../model/book';
import { indicateToHorrorGenre, indicateToFinanceGenre, filterBooks } from '../../../services/bookService';

const BookList = props => {
  const [ bookListState, setBookListState ] = useState({
    books: null,
    booksFiltered: null,
    booksDisplayed: null,
    loading: true,
    error: null,
    pageIndex: 0,
    pageSize: 30,
    sortBy: null,
    sortDir: null,
    filters: [
      { name: "authorGender", value: "" },
      { name: "genre", value: "" }
    ],
    genres: null,
    loaderText: "Please be patient 168MB incoming..."
  });

  const handleChangePage = (pageIndex) => {
    const { booksFiltered, pageSize } = bookListState;
    getBookPage(booksFiltered, pageIndex, pageSize)
      .then(({ books, booksDisplayed }) => setBookListState(state => ({ ...state, booksFiltered: books, booksDisplayed, pageIndex, loading: false })));
  }

  const handleChangeRowsPerPage = (pageSize) => {
    const { booksFiltered, pageIndex } = bookListState;
    getBookPage(booksFiltered, pageIndex, pageSize)
      .then(({ booksDisplayed }) => setBookListState(state => ({ ...state, booksDisplayed, pageSize, loading: false })));
  }

  const activateSorting = (sortBy, nextSortDir) => {
    const { books, booksFiltered, pageIndex, pageSize, filters } = bookListState;
    const nextSortBy = nextSortDir ? sortBy : null;
    const booksToSort = nextSortDir ? booksFiltered : filterBooks(books, filters);

    setBookListState(state => ({ ...state, loading: true }));
    getBookPage(booksToSort, pageIndex, pageSize, nextSortBy, nextSortDir)
      .then(({ books, booksDisplayed }) => setBookListState(state => ({
        ...state,
        booksFiltered: books,
        booksDisplayed,
        pageSize,
        sortDir: nextSortDir,
        sortBy: nextSortBy,
        loading: false
      })));
  }

  const onFilter = (filterName, filterValue) => {
    const { books, filters } = bookListState;
    const activeFilter = filters.find(filter => filter.name === filterName);
    const isFilterValueTheSame = activeFilter.value === filterValue;
    const updatedFilters = filters
      .map(filter => ({
        ...filter,
        value: filter.name === filterName ? filterValue : filter.value 
      }));
    const areFiltersEmpty = updatedFilters.filter(filter => filter.value !== "").length === 0;
    
    if (isFilterValueTheSame) {
      return null;
    }

    setBookListState(state => ({ ...state, loading: true }));

    if (!areFiltersEmpty) {
      activateFiltering(filterBooks(books, updatedFilters), updatedFilters);
    } else {
      activateFiltering(books, updatedFilters);
    }
  }

  const activateFiltering = (booksFiltered, filters) => {
    const { pageIndex, pageSize, sortBy, sortDir } = bookListState;
    getBookPage(booksFiltered, pageIndex, pageSize, sortBy, sortDir)
      .then(({ books, booksDisplayed }) => setBookListState(state => ({
        ...state,
        booksFiltered: books,
        booksDisplayed,
        pageIndex,
        filters,
        loading: false
      })));
  }

  useEffect(() => {
    Axios.get('/data.json')
      .then(res => res.data)
      .then(books => books.map(book => mapBookFromDomain(book)))
      .then(booksMapped => indicateToHorrorGenre(booksMapped))
      .then(booksMapped => indicateToFinanceGenre(booksMapped))
      .then(booksMapped => {
        const { pageIndex, pageSize, sortBy, sortDir } = bookListState;
        const booksToGenres = booksMapped.map(book => book.genre);
        const genres = [...new Set(booksToGenres)];

        setBookListState(state => ({
          ...state,
          books: booksMapped,
          booksFiltered: booksMapped,
          genres,
          loaderText: null
        }));
        return getBookPage(booksMapped, pageIndex, pageSize, sortBy, sortDir);
      })
      .then(({ booksDisplayed }) => setBookListState(state => ({ ...state, booksDisplayed, loading: false })))
      .catch(ex => { setBookListState(state => ({ ...state, loading: false, error: ex })); })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBookList = () => {
    if (bookListState.error) {
      throw bookListState.error;
    }

    return <div className={classes.BookList}>
      {bookListState.genres && <BookFilter
        genreChoosen={bookListState.filters.find(filter => filter.name === 'genre').value}
        genres={bookListState.genres}
        onGenreFilter={filterValue => onFilter('genre', filterValue)}
        genderChoosen={bookListState.filters.find(filter => filter.name === 'authorGender').value}
        onGenderFilter={filterValue => onFilter('authorGender', filterValue)}
        ></BookFilter>}
      <Loader loading={bookListState.loading} text={bookListState.loaderText}>
        {bookListState.booksDisplayed && <Fragment>
          <TableContainer className={classes.TableContainer}>
            <Table aria-label="book table">
              <TableHead>
                <BookHeader
                  sortBy={bookListState.sortBy}
                  sortDir={bookListState.sortDir}
                  onSortingChoose={nextSortBy => activateSorting(
                    nextSortBy, 
                    mapToNextSortDir(bookListState.sortBy, nextSortBy, bookListState.sortDir)
                  )}></BookHeader>
              </TableHead>
              <TableBody>
                {bookListState.booksDisplayed.map((book, i) => <BookItem key={i} book={book}></BookItem>)}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[20, 30, 50]}
            component="div"
            count={bookListState.booksFiltered.length}
            rowsPerPage={bookListState.pageSize}
            page={bookListState.pageIndex}
            onChangePage={(e, pageIndex) => handleChangePage(pageIndex)}
            onChangeRowsPerPage={(e) => handleChangeRowsPerPage(e.target.value)}/>
        </Fragment>}
      </Loader>
    </div>;
  }
  
  return renderBookList();
};

export default BookList;