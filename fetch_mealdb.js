const https = require('https');

const searchMeal = (query) => {
  return new Promise((resolve) => {
    https.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.meals) {
            resolve(json.meals.map(m => ({ name: m.strMeal, img: m.strMealThumb })));
          } else {
            resolve([]);
          }
        } catch(e) { resolve([]); }
      });
    });
  });
};

async function main() {
  const queries = ['chicken', 'beef', 'pasta', 'soup', 'stew', 'vegan', 'salad', 'pork'];
  let all = [];
  for (const q of queries) {
    const res = await searchMeal(q);
    all = all.concat(res);
  }
  
  // also get cocktail API for juices
  https.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.drinks) {
           const drinks = json.drinks.map(d => ({ name: d.strDrink, img: d.strDrinkThumb }));
           console.log(JSON.stringify({ meals: all.slice(0,15), drinks: drinks.slice(0, 5) }, null, 2));
        }
      } catch(e) {}
    });
  });
}

main();
