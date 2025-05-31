import { fromCharCode, padStart, padEnd } from './sample.js'

//fromCharCode
describe('fromCharCode', () => {
  test('should return character for ASCII code 65', () => {
    expect(fromCharCode(65)).toBe('A');
  });

  test('should return character for ASCII code 97', () => {
    expect(fromCharCode(97)).toBe('a');
  });

  test('should return character for ASCII code 48', () => {
    expect(fromCharCode(48)).toBe('0');
  });

  test('should return character for ASCII code 32', () => {
    expect(fromCharCode(32)).toBe(' ');
  });

  test('should return empty string for invalid code', () => {
    expect(fromCharCode(NaN)).toBe('\u0000'); 
  });
});

//padStart
describe('padStart', () => {
  test('should pad string to target length with default space', () => {
    expect(padStart('5', 3)).toBe('  5');
  });

  test('should pad string with custom pad string', () => {
    expect(padStart('test', 6, '0')).toBe('00test');
  });

  test('should not pad if string already meets target length', () => {
    expect(padStart('hello', 5)).toBe('hello');
  });

  test('should cut padString if it overflows', () => {
    expect(padStart('abc', 8, 'xyz')).toBe('xyzxyabc');
  });

  test('should return original string if targetLength is less than string length', () => {
    expect(padStart('abcdef', 4, '.')).toBe('abcdef');
  });
});

//padEnd
describe('padEnd', () => {
  test('should pad string to target length with default space', () => {
    expect(padEnd('5', 3)).toBe('5  ');
  });

  test('should pad string with custom pad string', () => {
    expect(padEnd('hi', 5, '*')).toBe('hi***');
  });

  test('should not pad if string already meets target length', () => {
    expect(padEnd('hello', 5)).toBe('hello');
  });

  test('should cut padString if it overflows', () => {
    expect(padEnd('abc', 8, 'xyz')).toBe('abcxyzxy');
  });

  test('should return original string if targetLength is less than string length', () => {
    expect(padEnd('abcdef', 4, '.')).toBe('abcdef');
  });
});