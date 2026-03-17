const https = require('https');
const fs = require('fs');

const url = "https://unsplash.com/s/photos/food";

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // extract all unique unsplash photo IDs
    const regex = /"id":"([a-zA-Z0-9_\-]+)",/g;
    let match;
    const ids = new Set();
    while ((match = regex.exec(data)) !== null) {
      if (match[1].length > 8) {
         ids.add(match[1]);
      }
    }
    console.log("Found IDs:", Array.from(ids).slice(0, 30));
  });
}).on('error', console.error);
