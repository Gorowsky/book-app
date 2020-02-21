export const filterBooks = (books, filters) => {
  return filters
    .filter(filter => !!filter.value)
    .reduce((acc, filter) => acc.filter(book => book[filter.name] === filter.value), books);
}

export const indicateToHorrorGenre = (books) => {
  const halloweenMonth = 9;
  const halloweenDate = 31;
  return books
    .map(book => {
      const d = new Date(book.date);

      if (d.getMonth() === halloweenMonth && d.getDate() === halloweenDate) {
        return { ...book, genre: 'Horror', indicated: true };
      }

      return book;
    });
}

export const indicateToFinanceGenre = (books) => {
  return books
    .map(book => {
      const d = new Date(book.date);
      const isFriday = d.getDay() === 5;

      if (isFriday) {
        const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
        const isFridayLastInMonth = (daysInMonth - d.getDate()) <= 6;

        if (isFridayLastInMonth) {
          return { ...book, genre: 'Finance', indicated: true };
        }
      }

      return book;
    });
}