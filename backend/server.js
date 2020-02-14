const express = require("express");
const server = express();
const { DeckEncoder } = require("runeterra");
const { getDeck } = require("./helpers");
const cors = require("cors");

server.get("/deck/:code", cors(), (req, res) => {
  const code = req.params.code;
  const deck = DeckEncoder.decode(code);

  res.json({ deck: getDeck(deck) });
});

server.get("/image/:code", cors(), (req, res) => {
  const code = req.params.code;
  res.sendFile(
    `${__dirname}/datadragon-set1-lite-en_us/en_us/img/cards/${code}.png`
  );
});

const port = 4000;

server.listen(port, () => {
  console.log(`server listening on ${port}`);
});
