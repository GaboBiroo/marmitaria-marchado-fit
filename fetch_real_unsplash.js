const https = require('https');

const queries = [
  "roasted chicken vegetables",
  "shepherds pie",
  "ground beef rice",
  "chicken fried rice plate",
  "meatballs tomato sauce",
  "spaghetti bolognese",
  "chicken soup bowl",
  "chicken stroganoff",
  "feijoada",
  "beef stew plate",
  "chicken salad bowl",
  "tuna salad bowl",
  "sweet potato salad",
  "vegan healthy salad",
  "chickpea salad plate",
  "green juice glass",
  "orange fruit juice glass",
  "cucumber mint juice",
  "spinach juice",
  "mint tea glass"
];

function fetchUnsplash(query) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/s/photos/${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const matches = [...data.matchAll(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+[^\s"']+/g)];
        const urls = matches.map(m => m[0].replace(/&amp;/g, '&')).filter(u => u.includes('w='));
        if (urls.length > 0) {
          resolve({ query, url: urls[0].split('?')[0] + '?auto=format&fit=crop&q=80&w=600&h=400' });
        } else {
          resolve({ query, url: "NOT_FOUND" });
        }
      });
    }).on('error', () => resolve({ query, url: "ERROR" }));
  });
}

async function run() {
  const results = [];
  for (const q of queries) {
    const res = await fetchUnsplash(q);
    results.push(res);
    await new Promise(r => setTimeout(r, 500));
  }
  console.log(JSON.stringify(results, null, 2));
}

run();
