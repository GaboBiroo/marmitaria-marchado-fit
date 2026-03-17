const https = require('https');
const titles = ["Bolognese sauce", "Cobb salad", "Maghrebi mint tea", "Meatball"];
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
    urls[titles[i]] = res.url;
  }
  console.log(JSON.stringify(urls, null, 2));
}
run();
