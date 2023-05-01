import puppeteer from 'puppeteer';

const PUPPETEER_OPTIONS = {
  headless: true,
  args: [
    '--use-gl=egl',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-first-run',
    '--no-sandbox',
    '--no-zygote',
    // '--single-process',
    "--proxy-server='direct://'",
    '--proxy-bypass-list=*',
    '--deterministic-fetch',
    '--window-size=960,540',
  ],
};

export class Pptr {
  public static browser = puppeteer.launch(PUPPETEER_OPTIONS);
  constructor() {}
}
