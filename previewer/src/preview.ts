import puppeteer from 'puppeteer';
import path from 'path';
import { PREFIX, SAVE_PATH } from './envLayer';

const DIV_ID = '#jubo';

export async function saveScreenshot(url: string) {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--single-process'],
    devtools: false,
    dumpio: true,
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(DIV_ID);

  const filename = path.join(
    SAVE_PATH,
    `${PREFIX}-${new Date().toISOString()}.png`
  );
  const element = await page.$(DIV_ID);
  await element?.screenshot({ path: filename });
  await browser.close();

  return filename;
}
