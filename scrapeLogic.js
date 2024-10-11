const puppeteer = require("puppeteer");
require("dotenv").config();
const uLogin = 'locacao2@friasneto.com.br'
const uPass = 'Corr&t0r@2024'

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--start-maximized"
    ],
    headless:false
  });
  try {
    const page = await browser.newPage();
    await page.goto('https://friasneto.reportload.com/signin'); // wait until page load
    page.waitForNavigation({ waitUntil: 'networkidle0' })
    await page.waitForSelector('input[type="email"]', { visible: true })
    await page.type('input[type="email"]', uLogin)
    await page.waitForSelector('input[type="password"]', { visible: true })
    await page.type('input[type="password"]', uPass)
    await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
res.send('função deu certo')
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  }
};

module.exports = { scrapeLogic };
