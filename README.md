# Product Scraper : LDLC plugin

## Installation

```
npm i -E @igorissen/product-scraper-plugin-ldlc
```

## Usage

```node
import { ProductScraper } from '@igorissen/product-scraper-core';
import { LDLCProduct, LDLCProductScraperPlugin } from '@igorissen/product-scraper-plugin-ldlc';

const scraper = new ProductScraper();
const url = 'https://www.ldlc.com/fr-be/fiche/PB00317660.html';
await scraper.init();
scraper.register(LDLCProductScraperPlugin);
const product = await scraper.plugins(LDLCProductScraperPlugin.name).summaryProductDetails(url);

// { name: 'LDLC Cobalt A200', price: 59.95 }
```

## Roadmap

See the [open issues](https://github.com/igorissen/product-scraper-plugin-ldlc/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create.
Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Branch
   - feature : **feat/<branch-name>**
   - fix : **fix/<branch-name>**
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
