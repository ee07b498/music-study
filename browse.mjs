import { chromium } from 'playwright';

const url = 'https://www.meyamusicsydney.com';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 首页
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.screenshot({ path: 'screenshot-home.png', fullPage: true });
  console.log('Homepage captured');

  // 获取所有导航链接
  const navLinks = await page.evaluate(() => {
    const links = document.querySelectorAll('nav a[href]');
    return [...links].map(a => ({ text: a.textContent.trim(), href: a.href }))
      .filter(l => l.text && l.href.includes('meyamusicsydney.com'));
  });
  console.log('Nav links:', JSON.stringify(navLinks, null, 2));

  // 截取几个关键页面
  const pagesToVisit = navLinks.slice(0, 6);
  for (let i = 0; i < pagesToVisit.length; i++) {
    const link = pagesToVisit[i];
    try {
      await page.goto(link.href, { waitUntil: 'networkidle', timeout: 20000 });
      await page.screenshot({ path: `screenshot-${i + 1}.png`, fullPage: true });
      console.log(`Captured: ${link.text} -> ${link.href}`);
    } catch (e) {
      console.log(`Failed: ${link.text} -> ${e.message}`);
    }
  }

  await browser.close();
})();
