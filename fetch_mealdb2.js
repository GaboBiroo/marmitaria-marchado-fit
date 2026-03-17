const https = require('https');

const fetchMeal = (id) => new Promise(r => {
  https.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, res => {
    let d = ''; res.on('data', c => d+=c); res.on('end', () => r(JSON.parse(d).meals[0].strMealThumb));
  });
});
const fetchDrink = (id) => new Promise(r => {
  https.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, res => {
    let d = ''; res.on('data', c => d+=c); res.on('end', () => r(JSON.parse(d).drinks[0].strDrinkThumb));
  });
});

async function run() {
  const images = {
    m1: await fetchMeal(52846), // Chicken & Mushroom Hotpot 
    m2: await fetchMeal(52811), // Ribeye Steak with Brown Ale Meat Sauce (meat dish)
    m3: await fetchMeal(52993), // Minced Beef Pie
    m4: await fetchMeal(52956), // Chicken Congee
    m5: await fetchMeal(52953), // Bakewell tart
    m6: await fetchMeal(52770), // Spaghetti Bolognese
    m7: await fetchMeal(52925), // Split Pea Soup (green/yellow soup)
    m8: await fetchMeal(52850), // Chicken Tikka Masala (looks like stroganoff)
    m9: await fetchMeal(52990), // Christmas Pudding
    m10: await fetchMeal(52824), // Beef Sunday Roast
    
    sa1: await fetchMeal(52997), // Beef Banh Mi Bowls with Sriracha Mayo
    sa2: await fetchMeal(52852), // Burek (looks like salad plate)
    sa3: await fetchMeal(52963), // Shakshuka (looks like salad plate)
    sa4: await fetchMeal(52775), // Vegan Lasagna
    sa5: await fetchMeal(52816), // Roasted Eggplant With Tahini
    
    su1: await fetchDrink(12688), // Lassi Khara (greenish drink)
    su2: await fetchDrink(12712), // Grape lemon pineapple Smoothie
    su3: await fetchDrink(12708), // Fruit Shake
    su4: await fetchDrink(12690), // Lassi - Mango
    su5: await fetchDrink(12702), // Cranberry Punch
  };
  console.log(JSON.stringify(images, null, 2));
}
run();
