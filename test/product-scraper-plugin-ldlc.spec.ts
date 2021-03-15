import { ProductScraper } from '@igorissen/product-scraper-core';
import { expect } from 'chai';
import { LDLCProduct, LDLCProductScraperPlugin } from '../src/product-scraper-plugin-ldlc';

const version = require('../package.json').version;
const expectedProduct: LDLCProduct = { name: 'LDLC Cobalt A200' };

describe('LDLC scraper plugin', () => {
  describe('register to scraper core', () => {
    let scraper: ProductScraper;

    before(async () => {
      scraper = new ProductScraper();
      await scraper.init();
      scraper.register(LDLCProductScraperPlugin);
    });

    it('should be registered', () => {
      expect(scraper.plugins(LDLCProductScraperPlugin.name)).to.not.be.undefined;
    });

    it(`should have the same package version (${version})`, () => {
      expect(scraper.plugins(LDLCProductScraperPlugin.name).version).to.equal(version);
    });
  });

  describe('summary product details', () => {
    let scraper: ProductScraper;
    let product: LDLCProduct;
    const url = 'https://www.ldlc.com/fr-be/fiche/PB00317660.html';

    before(async () => {
      scraper = new ProductScraper();
      await scraper.init();
      scraper.register(LDLCProductScraperPlugin);
      product = await scraper.plugins(LDLCProductScraperPlugin.name).summaryProductDetails(url);
    });

    it('should retrieve an object', async () => {
      expect(product).to.be.an('object');
    });

    it(`should have "${expectedProduct.name}" as a product name`, () => {
      expect(product.name).to.equal(expectedProduct.name);
    });

    it(`should have a price greater than 0`, () => {
      expect(product?.price).to.be.greaterThan(0);
    });
  });
});
