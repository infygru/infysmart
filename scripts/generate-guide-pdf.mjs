import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlFile = path.join(__dirname, 'product-data-entry-guide.html');
const outFile  = path.join(__dirname, 'Infysmart-Product-Data-Entry-Guide.pdf');

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page    = await browser.newPage();

const fileUrl = 'file:///' + htmlFile.replace(/\\/g, '/');
await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

await page.pdf({
  path: outFile,
  format: 'A4',
  printBackground: true,
  margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
});

await browser.close();
console.log('PDF saved to:', outFile);
