import puppeteer from 'puppeteer';
import path from 'path';
import { PREFIX, SAVE_PATH } from './envLayer';

const DIV_ID = '#jubo';

const PUPPETEER_OPTIONS = {
  headless: true,
  args: [
    // '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-first-run',
    '--no-sandbox',
    '--no-zygote',
    '--single-process',
    "--proxy-server='direct://'",
    '--proxy-bypass-list=*',
    '--deterministic-fetch',
    '--window-size=900,1100',
  ],
};
export async function saveScreenshot(url: string) {
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
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
