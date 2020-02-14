const fs = require("fs");

let raw_data = fs.readFileSync(
  ".\\datadragon-set1-lite-en_us\\en_us\\data\\set1-en_us.json"
);
const data = JSON.parse(raw_data);

function getDeck(deck) {
  let richDeck = [];
  for (const c of deck) {
    let card = data.find(element => element.cardCode === c.code);
    richDeck.push({
      code: c.code,
      name: card.name,
      count: c.count,
      cost: card.cost,
      region: card.region
    });
  }
  return richDeck;
}

exports.getDeck = getDeck;
