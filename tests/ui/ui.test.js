const puppeteer = require("puppeteer");

describe("DemoQA Book Store UI tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Should display search box", async () => {
    await page.goto("https://demoqa.com/books", { waitUntil: "networkidle2" });
    const searchBox = await page.$("#searchBox");
    expect(searchBox).toBeTruthy();
  }, 10000);

  test("Should find book by search", async () => {
    await page.goto("https://demoqa.com/books");
    await page.type("#searchBox", "Git");
    await page.waitForSelector(".rt-tbody .rt-tr-group");
    const bookText = await page.$eval(
      ".rt-tbody .rt-tr-group",
      (el) => el.textContent
    );
    expect(bookText).toMatch(/Git/i);
  });

  test("Should display books table", async () => {
    await page.goto("https://demoqa.com/books", { waitUntil: "networkidle2" });
    const table = await page.$(".rt-table");
    expect(table).toBeTruthy();
  }, 10000);

  test("Should have correct table column headers", async () => {
    await page.goto("https://demoqa.com/books");
    const headers = await page.$$eval(".rt-thead.-header .rt-th", (ths) =>
      ths.map((th) => th.textContent.trim())
    );
    expect(headers).toEqual(
      expect.arrayContaining(["Image", "Title", "Author", "Publisher"])
    );
  });

  test("Should scroll to the bottom of the book list page", async () => {
    await page.goto("https://demoqa.com/books");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeGreaterThan(0);
  });
});
