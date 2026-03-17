const https = require('https');

const queries = [
  "grilled chicken vegetables",
  "shepherds pie meat",
  "ground beef broccoli",
  "chicken with rice dish",
  "meatballs with tomato sauce",
  "spaghetti bolognese",
  "chicken broth soup",
  "chicken stroganoff",
  "feijoada black bean stew",
  "beef strips potatoes",
  "chicken salad bowl",
  "tuna salad bowl egg",
  "sweet potato chicken salad",
  "vegan colorful salad beetroot",
  "chickpea salad feta",
  "green juice mint",
  "orange green juice",
  "cucumber green juice",
  "dark green spinach juice",
  "light green juice mint"
];

const fetchImage = (query) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'unsplash.com',
      path: `/s/photos/${encodeURIComponent(query)}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Find the first image url like https://images.unsplash.com/photo-...
        const match = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+[^"'\s]+/);
        if (match) {
           // clean up the URL parameters and append our own
           let url = match[0].split('?')[0];
           resolve(url + '?q=80&w=600&auto=format&fit=crop');
        } else {
           resolve("NO_IMAGE_FOUND");
        }
      });
    }).on('error', (e) => reject(e));
  });
};

async function main() {
  const urls = [];
  for (const q of queries) {
    const url = await fetchImage(q);
    urls.push({ query: q, url });
    await new Promise(r => setTimeout(r, 800));
  }
  console.log(JSON.stringify(urls, null, 2));
}

main();
