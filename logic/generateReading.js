const fs = require("fs");

const cards = JSON.parse(
  fs.readFileSync("./data/cards.json", "utf-8")
);

function getPositionKey(role) {
  if (role === "current energy") return "current_energy";
  if (role === "obstacle or hidden factor") return "obstacle";
  if (role === "likely direction or advice") return "direction";
  return null;
}

function getPrimaryCategory(categories) {
  const supportedCategories = [
    "love",
    "career",
    "study",
    "progress",
    "decision",
    "general"
  ];

  for (const category of supportedCategories) {
    if (categories.includes(category)) {
      return category;
    }
  }

  return "general";
}

function generateReading(drawnCards, categories) {
  let totalScore = 0;
  const primaryCategory = getPrimaryCategory(categories);

  console.log("[generateReading] Categories received:", categories);
  console.log("[generateReading] Primary category selected:", primaryCategory);

  const interpretations = drawnCards.map((card) => {
    const cardEntry = cards[card.name];

    if (!cardEntry) {
      throw new Error(`Card "${card.name}" not found in cards.json`);
    }

    const data = cardEntry[card.orientation];

    if (!data) {
      throw new Error(
        `Orientation "${card.orientation}" not found for card "${card.name}"`
      );
    }

    totalScore += Number(data.yes_no_weight || 0);

    const positionKey = getPositionKey(card.role);

    let meaning = data.general || "No meaning available";

    if (data[primaryCategory]) {
      meaning = data[primaryCategory];
    }

    if (
      positionKey &&
      data.positions &&
      data.positions[primaryCategory] &&
      data.positions[primaryCategory][positionKey]
    ) {
      meaning = data.positions[primaryCategory][positionKey];
    }

    console.log(
      `[generateReading] ${card.name} (${card.orientation}) | role: ${card.role} | meaning used: ${meaning}`
    );

    return {
      name: card.name,
      role: card.role,
      orientation: card.orientation,
      meaning,
      advice: data.advice || ""
    };
  });

  return {
    interpretations,
    score: totalScore
  };
}

module.exports = generateReading;