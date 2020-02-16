const express = require("express");
const server = express();
const { DeckEncoder } = require("runeterra");
const { getDeck } = require("./helpers");
const cors = require("cors");
const path = require("path");

server.use(express.static(path.join(__dirname, "build")));

server.get("/json/:code", cors(), (req, res) => {
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

server.get("/*", cors(), (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const port = 80;

server.listen(port, () => {
  console.log(`server listening on ${port}`);
});