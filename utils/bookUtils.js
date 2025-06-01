export const isValidISBN = (isbn) => {
  return typeof isbn === 'string' && /^\d{13}$/.test(isbn);
};

export const filterBooksByAuthor = (books, author) => {
  return books.filter(book => book.author === author);
};

export const hasBookByISBN = (books, isbn) => {
  return books.some(book => book.isbn === isbn);
};

export const sortBooksByTitle = (books) => {
  return [...books].sort((a, b) => a.title.localeCompare(b.title));
};

export const getUniquePublishers = (books) => {
  const publishers = books.map(book => book.publisher);
  return [...new Set(publishers)];
};
