import { chromium } from 'playwright';
import fs from 'fs';

const CDP_URL = process.env.CDP_URL;
if (!CDP_URL) throw new Error('CDP_URL env var required (wss://... from your browser session)');
const BASE_DIR = '/home/user/ai-website-cloner-template';

async function main() {
  const browser = await chromium.connectOverCDP(CDP_URL);
  const contexts = browser.contexts();
  const context = contexts[0] || await browser.newContext();
  const pages = context.pages();
  const page = pages[0] || await context.newPage();

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.profitphones.com/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Desktop full-page screenshot
  await page.screenshot({
    path: `${BASE_DIR}/docs/design-references/desktop-full.png`,
    fullPage: true
  });
  console.log('Desktop screenshot taken');

  const globalData = await page.evaluate(() => {
    const allElements = [...document.querySelectorAll('*')].slice(0, 500);
    const fonts = new Set();
    allElements.forEach(el => {
      const ff = getComputedStyle(el).fontFamily;
      if (ff) fonts.add(ff);
    });

    const links = [...document.querySelectorAll('link')].map(l => ({ rel: l.rel, href: l.href }));

    const colorMap = {};
    allElements.forEach(el => {
      const cs = getComputedStyle(el);
      ['color','backgroundColor'].forEach(prop => {
        const val = cs[prop];
        if (val && val !== 'rgba(0, 0, 0, 0)' && val !== 'rgb(0, 0, 0)' && val !== 'transparent' && val !== 'rgb(255, 255, 255)') {
          colorMap[val] = (colorMap[val] || 0) + 1;
        }
      });
    });

    const bodyStyles = (() => {
      const cs = getComputedStyle(document.body);
      return { fontFamily: cs.fontFamily, fontSize: cs.fontSize, color: cs.color, backgroundColor: cs.backgroundColor, lineHeight: cs.lineHeight };
    })();

    const cssVars = {};
    for (let i = 0; i < document.styleSheets.length; i++) {
      try {
        const sheet = document.styleSheets[i];
        for (let r = 0; r < sheet.cssRules.length; r++) {
          const rule = sheet.cssRules[r];
          if (rule.selectorText === ':root' || rule.selectorText === 'html') {
            const text = rule.cssText;
            const matches = [...text.matchAll(/--([\w-]+):\s*([^;]+)/g)];
            for (const m of matches) cssVars[m[1]] = m[2].trim();
          }
        }
      } catch(e) {}
    }

    return { fonts: [...fonts], links, colorMap, bodyStyles, cssVars };
  });

  fs.writeFileSync(`${BASE_DIR}/docs/research/global-data.json`, JSON.stringify(globalData, null, 2));
  console.log('Fonts:', globalData.fonts.slice(0, 8));
  console.log('Top colors:', JSON.stringify(Object.entries(globalData.colorMap).sort((a,b) => b[1]-a[1]).slice(0, 20)));
  console.log('Body:', JSON.stringify(globalData.bodyStyles));
  console.log('Google Font links:', globalData.links.filter(l => l.href?.includes('fonts.google') || l.href?.includes('fonts.gstatic')).map(l => l.href));
  console.log('CSS vars:', JSON.stringify(Object.entries(globalData.cssVars).slice(0, 30)));

  const pageText = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync(`${BASE_DIR}/docs/research/page-text.txt`, pageText);
  console.log('Page text length:', pageText.length);

  const assets = await page.evaluate(() => {
    return {
      images: [...document.querySelectorAll('img')].map(img => ({
        src: img.src || img.currentSrc,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
        parentClasses: img.parentElement?.className?.toString().slice(0, 80),
      })).filter(i => i.src),
      videos: [...document.querySelectorAll('video')].map(v => ({
        src: v.src || v.querySelector?.('source')?.src,
        poster: v.poster,
      })),
      backgroundImages: [...document.querySelectorAll('*')].filter(el => {
        const bg = getComputedStyle(el).backgroundImage;
        return bg && bg !== 'none';
      }).map(el => ({
        url: getComputedStyle(el).backgroundImage,
        tag: el.tagName,
        classes: el.className?.toString().slice(0, 60)
      })),
      svgCount: document.querySelectorAll('svg').length,
      favicons: [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ href: l.href, sizes: l.sizes?.toString() }))
    };
  });

  fs.writeFileSync(`${BASE_DIR}/docs/research/assets.json`, JSON.stringify(assets, null, 2));
  console.log(`Assets: ${assets.images.length} imgs, ${assets.videos.length} vids, ${assets.backgroundImages.length} bg-imgs, ${assets.svgCount} SVGs`);
  console.log('Image URLs:', JSON.stringify(assets.images.map(i => i.src)));
  console.log('BG Images:', JSON.stringify(assets.backgroundImages.slice(0, 8).map(i => ({url: i.url.slice(0,120), classes: i.classes}))));
  console.log('Favicons:', JSON.stringify(assets.favicons));

  const domStructure = await page.evaluate(() => {
    function walk(el, depth) {
      if (depth > 4) return null;
      return {
        tag: el.tagName?.toLowerCase(),
        id: el.id || null,
        classes: el.className?.toString().slice(0, 80) || null,
        text: el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 ? el.textContent.trim().slice(0, 120) : null,
        children: [...el.children].slice(0, 25).map(c => walk(c, depth + 1)).filter(Boolean)
      };
    }
    return walk(document.body, 0);
  });
  fs.writeFileSync(`${BASE_DIR}/docs/research/dom-structure.json`, JSON.stringify(domStructure, null, 2));
  console.log('DOM structure saved');

  // Mobile screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${BASE_DIR}/docs/design-references/mobile-full.png`, fullPage: true });
  console.log('Mobile screenshot taken');

  await browser.disconnect();
  console.log('DONE');
}

main().catch(e => { console.error(e.message); process.exit(1); });
