import path from 'path';
import { PREFIX, SAVE_PATH } from '../envLayer';
import { Pptr } from './browser';
import { Browser } from 'puppeteer';

const DIV_ID = '#jubo';
export async function saveScreenshot(url: string) {
  const browser = await Pptr.browser;
  console.log('wsEndpoint: ', browser.wsEndpoint());
  const page = await browser.newPage();
  await page.setViewport({ width: 960, height: 540 });
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForSelector(DIV_ID);

  const filename = path.join(
    SAVE_PATH,
    `${PREFIX}-${new Date().toISOString()}.png`
  );
  const element = await page.$(DIV_ID);
  await new Promise((res) =>
    setTimeout(async () => {
      await element?.screenshot({ path: filename, encoding: 'binary' });
      res(1);
    }, 1000)
  );

  await browser.close();

  return filename;
}
