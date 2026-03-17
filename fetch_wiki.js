const https = require('https');

const titles = [
  "Roast chicken",
  "Shepherd's pie",
  "Picadillo",
  "Arroz con pollo",
  "Meatball",
  "Spaghetti bolognese",
  "Chicken soup",
  "Beef Stroganoff",
  "Feijoada",
  "Goulash", // Beef stew
  "Chicken salad",
  "Salade niçoise", // tuna salad
  "Sweet potato", // will just be a sweet potato
  "Mesclun", // mixed greens
  "Greek salad",
  "Smoothie", // green smoothie
  "Orange juice",
  "Cucumber juice",
  "Wheatgrass", // very green juice
  "Mint tea"
];

function getWikiImage(title) {
  return new Promise(resolve => {
    https.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=600&format=json`, {
      headers: { 'User-Agent': 'Node.js Bot' }
    }, res => {
      let data = ''; res.on('data', c => data+=c);
      res.on('end', () => {
        try {
          const pages = JSON.parse(data).query.pages;
          const page = Object.values(pages)[0];
          resolve({ title, url: page.thumbnail ? page.thumbnail.source : "NOT_FOUND" });
        } catch(e) { resolve({ title, url: "ERROR" }); }
      })
    })
  });
}

async function run() {
  const urls = {};
  for (let i = 0; i < titles.length; i++) {
    const res = await getWikiImage(titles[i]);
    urls[`i${i+1}`] = res.url;
  }
  console.log(JSON.stringify(urls, null, 2));
}

run();
