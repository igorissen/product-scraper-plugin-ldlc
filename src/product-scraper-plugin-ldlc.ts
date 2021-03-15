import { ProductScraperPlugin } from '@igorissen/product-scraper-core';
import { Page } from 'puppeteer';

const version = require('../package.json').version;
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36';

export type LDLCProduct = {
  name: string;
  price?: number;
};

export const LDLCProductScraperPlugin: ProductScraperPlugin = {
  version,
  name: 'ldlc',
  async summaryProductDetails(url: string): Promise<LDLCProduct> {
    const page: Page = await this.browser.newPage();
    await page.setUserAgent(USER_AGENT);
    await page.goto(url);

    const productElement = await page.waitForSelector('div#activeOffer', { visible: true });
    const productHeaderElement = await productElement.$('div.title');
    const wrapAsideElement = await productElement.$('div.wrap-aside');

    let productName: string;
    let productPrice: number;
    try {
      productName = await productHeaderElement.$eval('h1.title-1', (element) =>
        element?.textContent?.trim()
      );
    } catch (e) {
      throw new Error('Unable to retrieve product name');
    }

    try {
      productPrice = await wrapAsideElement.$eval(
        'div.price > div.price',
        (element) => +element?.textContent?.trim().replace('€', '.')
      );
    } catch (e) {
      // do nothing
    }

    await wrapAsideElement.dispose();
    await productHeaderElement.dispose();
    await productElement.dispose();

    return { name: productName, price: productPrice };
  }
};
