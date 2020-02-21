export const sort = (books, sortBy, sortDir) => {
  return books
    .sort((a, b) => {
      const dirPlus = sortDir === 'asc' ? 1 : -1;
      const dirMinus = sortDir === 'asc' ? -1 : 1;

      if (a[sortBy] > b[sortBy]) {
        return dirPlus;
      } else if (a[sortBy] < b[sortBy]) {
        return dirMinus;
      } else {
        return 0;
      }
    });
};