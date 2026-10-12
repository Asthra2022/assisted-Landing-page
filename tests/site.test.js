const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/tmp/asthra-browser/node_modules/playwright');
test('desktop and mobile page, navigation, enquiry and care dialogs', async () => {
 const browser = await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try {
 for (const width of [1440,390]) {
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
  assert.equal(await page.locator('h1').textContent(),'A home that feelslike family.');
  assert.equal(await page.locator('.service-card').count(),12);
  assert.equal(await page.locator('.location-card').count(),6);
  assert.ok(await page.locator('.hero-photo img').evaluate(img=>img.complete&&img.naturalWidth>0));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'no horizontal overflow');
  if(width<600){await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.locator('nav a[href="#services"]').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');}
  await page.locator('.service-card').first().click();assert.ok(await page.locator('dialog').evaluate(d=>d.open));await page.keyboard.press('Escape');
  await page.locator('.resource-grid button').first().click();assert.match(await page.locator('#dialog-title').textContent(),/Good food/);await page.locator('.dialog-close').click();
  await page.locator('summary').first().click();assert.ok(await page.locator('details').first().evaluate(d=>d.open));
  await page.locator('[name="name"]').fill('<Test Family>');await page.locator('[name="phone"]').fill('9876543210');await page.locator('[name="location"]').selectOption('Porur');await page.locator('[name="message"]').fill('Please arrange a visit.');await page.locator('#enquire button[type="submit"]').click();
  assert.match(await page.locator('#form-status').textContent(),/Nothing has been sent/);
  assert.match(await page.locator('#form-status a').getAttribute('href'),/sms:\+914440109000/);
  assert.equal(await page.locator('#form-status Test').count(),0);
  assert.deepEqual(errors,[]);
  await page.screenshot({path:`/tmp/asthra-${width}.png`,fullPage:true});await page.close();
 }
 }finally{await browser.close();}
});
