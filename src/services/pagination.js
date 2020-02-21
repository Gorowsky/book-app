// eslint-disable-next-line import/no-webpack-loader-syntax
import sortWorker from 'workerize-loader!./sortWorker';

export const getBookPage = (books, pageIndex, pageSize, sortBy = null, sortDir = null) => {
  if (sortBy && sortDir) {
    const worker = sortWorker();
    return worker
      .sort(books, sortBy, sortDir)
      .then(booksSorted => {
        worker.terminate();
        return pageSlice(booksSorted, pageIndex, pageSize);
      });
  } else {
    return pageSlice(books, pageIndex, pageSize);
  }
};

export const pageSlice = (books, pageIndex, pageSize) => {
  const startWith = pageIndex * pageSize;
  const endWith = pageIndex * pageSize + pageSize;
  return new Promise((resolve, reject) => resolve({ books, booksDisplayed: books.slice(startWith, endWith) }));
};

export const mapToNextSortDir = (sortBy, nextSortBy, currentSortDir) => {
  const isSortByTheSame = sortBy === nextSortBy;
  if (isSortByTheSame) {
    switch (currentSortDir) {
      case 'asc':
        return 'desc';
      case 'desc':
        return null;
      default:
        return 'asc';
    }
  } else {
    return 'asc';
  }
};