function Product(options) {
  this.place = options.place;
  this.price = options.price;
  this.weight = options.weight;
  this.name = options.name;
}

Product.prototype.getWeight = function() {
  return this.weight;
}

Product.prototype.getPrice = function() {
  return this.price;
}

Product.prototype.getName = function() {
  return this.name;
}

let milk = new Product({ place: 'dairy', weight: 1, price: 20.5, name: 'milk' });
let cheese = new Product({ place: 'dairy', weight: 0.5, price: 120.4, name: 'cheese' });
let butter = new Product({ place: 'dairy', weight: 0.5, price: 110.0, name: 'butter' });
let creame = new Product({ place: 'dairy', weight: 0.75, price: 150.9, name: 'creame' });

let bear = new Product({ place: 'alcohol', weight: 0.5, price: 30.9, name: 'bear' });
let vodka = new Product({ place: 'alcohol', weight: 0.1, price: 50.1, name: 'vodka' });
let brandy = new Product({ place: 'alcohol', weight: 0.5, price: 250.5, name: 'brandy' });
let rum = new Product({ place: 'alcohol', weight: 0.6, price: 340.1, name: 'rum' });
let tequila = new Product({ place: 'alcohol', weight: 0.6, price: 320.3, name: 'tequila' });

let potato = new Product({ place: 'vegetable', weight: 5, price: 14.7, name: 'potato' });
let tomato = new Product({ place: 'vegetable', weight: 1.2, price: 34.6, name: 'tomato' });
let cabbage = new Product({ place: 'vegetable', weight: 2, price: 22.2, name: 'cabbage' });
let pepper = new Product({ place: 'vegetable', weight: 0.8, price: 66.7, name: 'pepper' });
let carrot = new Product({ place: 'vegetable', weight: 1.5, price: 15.8, name: 'carrot' });
let beatroot = new Product({ place: 'vegetable', weight: 1.8, price: 25.8, name: 'beatroot' });

let goods = [milk, cheese, butter, creame, bear, vodka, brandy, rum, tequila, potato, tomato, cabbage, pepper, carrot, beatroot];
function Market(goods) {
  this.goods = goods;
}

Market.prototype.findByProductName = function(name) {
  return this.goods.find(g => g.name === name);
}

let market = new Market(goods);

window.onload = function() {
  console.log(market);
  let listOfProducts = ''; 
  market.goods.forEach((g, index) => {
    listOfProducts += index + 1 + '. ' + g.getName() + '\n';
  });
  document.getElementById('list').innerText = listOfProducts;
};

let char = [];

function Buy(e) {
  e.preventDefault();
  let itemName = document.getElementById('item').value;
  
  let item = market.findByProductName(itemName);
  if (!item) return alert('Can\'t find such item!');
  char.push(item);
  updateUI();
}

function updateUI() {
  const currentChar = document.getElementById('char').innerHTML;
  const itemNumber = char.length;
  const itemName = char[itemNumber - 1].getName();
  const itemWeight = char[itemNumber - 1].getWeight();
  const itemPrice = char[itemNumber - 1].getPrice();
  const newCharRow = `<div style="display: flex; flex-direction: row">
          <div style="width: 30px">${itemNumber}</div>
          <div style="width: 120px">${itemName}</div>
          <div style="width: 100px">${itemWeight}</div>
          <div style="width: 100px">${itemPrice}</div>
        </div>`;
  document.getElementById('char').innerHTML = currentChar + newCharRow;
  let totalWeight = 0;
  let totalPrice = 0;
  char.forEach(g => {
    totalWeight += g.getWeight();
    totalPrice += g.getPrice();
  });
   document.getElementById('totalWeight').innerText = totalWeight.toFixed(2);;
   document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);;
}
