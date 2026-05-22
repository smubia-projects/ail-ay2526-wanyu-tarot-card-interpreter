const fs = require("fs");

const cards = JSON.parse(
  fs.readFileSync("./data/cards.json", "utf-8")
);

function drawThreeCards() {
  const cardNames = Object.keys(cards);

  const selected = [];
  const usedNames = [];

  while (selected.length < 3) {
    const randomCard =
      cardNames[Math.floor(Math.random() * cardNames.length)];

    if (!usedNames.includes(randomCard)) {
      const orientation = Math.random() > 0.5 ? "upright" : "reversed";

      selected.push({
        name: randomCard,
        orientation
      });

      usedNames.push(randomCard);
    }
  }

  return selected;
}

module.exports = drawThreeCards;