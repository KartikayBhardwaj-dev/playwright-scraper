import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=19',
  'https://sanand0.github.io/tdsdata/js_table/?seed=20',
  'https://sanand0.github.io/tdsdata/js_table/?seed=21',
  'https://sanand0.github.io/tdsdata/js_table/?seed=22',
  'https://sanand0.github.io/tdsdata/js_table/?seed=23',
  'https://sanand0.github.io/tdsdata/js_table/?seed=24',
  'https://sanand0.github.io/tdsdata/js_table/?seed=25',
  'https://sanand0.github.io/tdsdata/js_table/?seed=26',
  'https://sanand0.github.io/tdsdata/js_table/?seed=27',
  'https://sanand0.github.io/tdsdata/js_table/?seed=28'
];

test('Scrape and sum table numbers for 23f2004903@ds.study.iitm.ac.in', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let globalSum = 0;

  for (const url of urls) {
    console.log(`Visiting: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });  // Wait for dynamic content
    const numbers = await page.$$eval('table td', elements => 
      elements.flatMap(td => {
        const text = td.textContent?.trim();
        return text ? [parseFloat(text)] : [];
      }).filter(n => !isNaN(n))
    );
    const pageSum = numbers.reduce((acc, n) => acc + n, 0);
    console.log(`Page sum: ${pageSum}`);
    globalSum += pageSum;
  }

  await browser.close();
  console.log(`FINAL TOTAL SUM: ${globalSum}`);
  expect(globalSum).toBeGreaterThan(0);  // Dummy assertion to pass test
});

