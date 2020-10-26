const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080');
 


  await page.type('#Email', 'test1@gmail.com'); // Cet Email doit être créé en base de données ( ou en utilisant la fonctionnalité inscription )

  await page.type('#Password', 'test', {delay: 100}); // Ce Mot de passe doit être créé en base de données ( ou en utilisant la fonctionnalité inscription )


  const connexion = 'button';
  await page.click(connexion);
  await page.screenshot({path: 'Success.png'});


  await browser.close();
})();
