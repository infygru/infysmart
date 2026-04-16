import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CHROME_PATH = 'C:\\Users\\naren\\.cache\\puppeteer\\chrome\\win64-146.0.7680.153\\chrome-win64\\chrome.exe';
const HTML_FILE = join(__dirname, process.argv[2] || 'product-guide.html');
const OUTPUT_PDF = join(__dirname, process.argv[3] || 'Infysmart-Product-SEO-Guide.pdf');

(async () => {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  console.log('Loading HTML file...');
  await page.goto(`file:///${HTML_FILE.replace(/\\/g, '/')}`, {
    waitUntil: 'networkidle0',
  });

  // Wait a bit for any CSS animations/fonts to settle
  await new Promise(r => setTimeout(r, 1000));

  console.log('Generating PDF...');
  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`PDF saved to: ${OUTPUT_PDF}`);
})();
