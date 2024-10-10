const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
      "--start-maximized"
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
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
