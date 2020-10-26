const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080');
 


  await page.type('#Email', 'randomemail@false.com'); // Cet email n'existe pas dans la base de données
  await page.type('#Password', 'randommdp', {delay: 100});  // Cet mdp n'existe pas dans la base de données


  const connexion = 'button';
  await page.click(connexion);
  await page.screenshot({path: 'Error.png'}); // Génération du png contenant l'image de l'erreur
 

  await browser.close();
})();

