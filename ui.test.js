const puppeteer = require('puppeteer');

let browser;
let page;
const url = 'https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html';

beforeEach(async () => {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
}, 20000);

afterEach(async () => {
  await browser.close();
});

test('Page title is correct', async () => {
  const title = await page.title();
  expect(title).toMatch(/Jackets - Tops - Men/i);
});

test('There are more than 0 products on the page', async () => {
  const products = await page.$$eval('.product-item', items => items.length);
  expect(products).toBeGreaterThan(0);
});

test('Product grid exists on the page', async () => {
  const grid = await page.$('.products-grid');
  expect(grid).toBeTruthy();
});

test('Filter section is visible', async () => {
  const filter = await page.$('.filter-options');
  expect(filter).not.toBeNull();
});

test('All products have images', async () => {
  await page.waitForSelector('.product-image-photo');

  const images = await page.$$eval('.product-image-photo', imgs =>
    imgs.map(img => img.getAttribute('src'))
  );

  expect(images.length).toBeGreaterThan(0);
  images.forEach(src => {
    expect(typeof src).toBe('string');
    expect(src).toMatch(/^https?:\/\//); // має бути повна URL-адреса
  });
});



