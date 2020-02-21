export const mapBookFromDomain = (book) => ({
  name: book.name,
  genre: book.genre,
  date: book.date,
  image: book.image,
  authorName: book.author.name,
  authorGender: book.author.gender
});