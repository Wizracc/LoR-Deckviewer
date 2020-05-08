const fs = require("fs");

let raw_data_set1 = fs.readFileSync(
  "./set1-lite-en_us/en_us/data/set1-en_us.json"
);
let raw_data_set2 = fs.readFileSync(
  "./set2-lite-en_us/en_us/data/set2-en_us.json"
);
const data1 = JSON.parse(raw_data_set1);
const data2 = JSON.parse(raw_data_set2)

function getDeck(deck) {
  let richDeck = [];
  for (const c of deck) {
    var card;
    var set;
    if(c.code.startsWith("01")){
      card = data1.find(element => element.cardCode === c.code);
      set = 1;
    } else {
      card = data2.find(element => element.cardCode === c.code);
      set = 2;
    }
    
    let megatype = "";
    
    if (card.supertype === "Champion") {
      megatype = "Champion";
    } else if (card.type === "Unit") {
      megatype = "Follower";
    } else {
      megatype = "Spell";
    }
    
    console.log(deck);
    richDeck.push({
      set: set,
      code: c.code,
      name: card.name,
      count: c.count,
      cost: card.cost,
      region: card.region,
      rarity: card.rarity,
      type: card.type,
      supertype: card.supertype,
      megatype: megatype
    });
  }
  return richDeck;
}

exports.getDeck = getDeck;
