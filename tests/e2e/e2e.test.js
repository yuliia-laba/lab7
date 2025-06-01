/*const puppeteer = require('puppeteer');

describe('DemoQA E2E Tests', () => {
  jest.setTimeout(60000); 

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

  test('Radio Buttons - should select "Yes" and check response', async () => {
    await page.goto('https://demoqa.com/radio-button', { waitUntil: 'networkidle2' });

    await page.waitForSelector('label[for="yesRadio"]', { visible: true });
    await page.click('label[for="yesRadio"]');

    await page.waitForSelector('.text-success', { visible: true });
    const result = await page.$eval('.text-success', el => el.textContent.trim());
    expect(result).toBe('Yes');
  });

  test('Web Tables - should click Add button and see modal form', async () => {
    await page.goto('https://demoqa.com/webtables', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#addNewRecordButton', { visible: true });
    await page.click('#addNewRecordButton');

    await page.waitForSelector('#firstName', { visible: true });
    const formVisible = await page.$eval('#registration-form-modal', el => getComputedStyle(el).display !== 'none');
    expect(formVisible).toBe(true);
  });

   test('Drag and Drop - should move element from left to right',
    async () => {
      await page.goto('https://demoqa.com/droppable', { waitUntil: 'networkidle2' });

      const draggable = await page.$('#draggable');
      const droppable = await page.$('#droppable');

      const draggableBox = await draggable.boundingBox();
      const droppableBox = await droppable.boundingBox();

      await page.mouse.move(
        draggableBox.x + draggableBox.width / 2,
        draggableBox.y + draggableBox.height / 2
      );
      await page.mouse.down();
      await page.mouse.move(
        droppableBox.x + droppableBox.width / 2,
        droppableBox.y + droppableBox.height / 2,
        { steps: 20 }
      );
      await page.mouse.up();

      await page.waitForFunction(
        () => document.querySelector('#droppable p').textContent.includes('Dropped!'),
        { timeout: 5000 }
      );
    },
    15000
  );

  test('Dynamic Properties - should wait for enabled button',
    async () => {
      await page.goto('https://demoqa.com/dynamic-properties', { waitUntil: 'domcontentloaded' });

      await page.waitForSelector('#enableAfter:enabled', { timeout: 10000 });

      const isEnabled = await page.$eval('#enableAfter', el => !el.disabled);
      expect(isEnabled).toBe(true);
    },
    15000
  );

  test('Modal Dialog - should open and close small modal',
    async () => {
      await page.goto('https://demoqa.com/modal-dialogs', { waitUntil: 'domcontentloaded' });

      await page.click('#showSmallModal');

      await page.waitForSelector('#example-modal-sizes-title-sm', { visible: true });

      const modalTitle = await page.$eval('#example-modal-sizes-title-sm', el => el.textContent);
      expect(modalTitle).toBe('Small Modal');

      await page.click('#closeSmallModal');

      await page.waitForSelector('#example-modal-sizes-title-sm', { hidden: true });
    },
    15000
  );
});*/
