require("dotenv").config();
const express = require("express");
const OpenAI = require("openai");

const app = express();
const port = 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static("public"));

/*
Major Arcana cards
The frontend sends numbers 1–22.
We convert them to these card names.
*/
const majorArcana = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World"
];

/* Random upright / reversed orientation */
function getRandomOrientation() {
  return Math.random() < 0.5 ? "upright" : "reversed";
}

/* Tarot reading endpoint */
app.post("/reading", async (req, res) => {
  try {

    const { question, selectedCards } = req.body;

    if (!question || !selectedCards || selectedCards.length !== 3) {
      return res.json({
        error: "Please ask a question and select exactly 3 cards."
      });
    }

    /*
    Convert selected card numbers
    into tarot cards
    */

    const chosenCards = selectedCards.map((cardNumber, index) => {

      const cardName = majorArcana[cardNumber - 1];

      const role =
        index === 0
          ? "Current energy"
          : index === 1
          ? "Obstacle or hidden factor"
          : "Likely direction or advice";

      return {
        name: cardName,
        role: role,
        orientation: getRandomOrientation()
      };
    });

    /*
    Build AI prompt
    */

    const prompt = `
You are a witty tarot interpreter.

Write a playful tarot reading based ONLY on the cards provided.

Rules:
- Do not use markdown
- Do not use asterisks
- Write clearly in normal paragraphs
- Interpret all 3 cards
- First explain each card briefly
- Then give a short combined interpretation
- End with a short verdict

User question:
${question}

Tarot cards drawn:

Card 1:
${chosenCards[0].name} (${chosenCards[0].orientation})
Role: ${chosenCards[0].role}

Card 2:
${chosenCards[1].name} (${chosenCards[1].orientation})
Role: ${chosenCards[1].role}

Card 3:
${chosenCards[2].name} (${chosenCards[2].orientation})
Role: ${chosenCards[2].role}
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    /*
    Remove accidental markdown symbols
    */

    const cleanAnswer = response.output_text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "");

    res.json({
      answer: cleanAnswer,
      cards: chosenCards
    });

  } catch (error) {

    console.error(error);

    res.json({
      error: "The tarot spirits encountered an error."
    });

  }
});

/* Start server */

app.listen(port, () => {
  console.log(`Tarot server running at http://localhost:${port}`);
});