import {
  isValidISBN,
  filterBooksByAuthor,
  hasBookByISBN,
  sortBooksByTitle,
  getUniquePublishers
} from '../../utils/bookUtils.js';

const mockBooks = [
  { title: 'Book A', author: 'Author 1', isbn: '9781234567890', publisher: 'Pub 1' },
  { title: 'Book B', author: 'Author 2', isbn: '9780987654321', publisher: 'Pub 2' },
  { title: 'Book C', author: 'Author 1', isbn: '9781111111111', publisher: 'Pub 1' },
];

describe('isValidISBN', () => {
  test('validates correct ISBN format', () => {
    expect(isValidISBN('9781234567890')).toBe(true);
    expect(isValidISBN('1234567890')).toBe(false);
    expect(isValidISBN(9781234567890)).toBe(false);
  });
});

describe('filterBooksByAuthor', () => {
  test('filters books by author correctly', () => {
    const result = filterBooksByAuthor(mockBooks, 'Author 1');
    expect(result.length).toBe(2);
    expect(result.every(book => book.author === 'Author 1')).toBe(true);
  });
});

describe('hasBookByISBN', () => {
  test('checks presence of book by ISBN', () => {
    expect(hasBookByISBN(mockBooks, '9780987654321')).toBe(true);
    expect(hasBookByISBN(mockBooks, '0000000000000')).toBe(false);
  });
});

describe('sortBooksByTitle', () => {
  test('sorts books by title alphabetically', () => {
    const sorted = sortBooksByTitle(mockBooks);
    expect(sorted[0].title).toBe('Book A');
    expect(sorted[1].title).toBe('Book B');
    expect(sorted[2].title).toBe('Book C');
  });
});

describe('getUniquePublishers', () => {
  test('returns unique publishers from book list', () => {
    const publishers = getUniquePublishers(mockBooks);
    expect(publishers).toContain('Pub 1');
    expect(publishers).toContain('Pub 2');
    expect(publishers.length).toBe(2);
  });
});
