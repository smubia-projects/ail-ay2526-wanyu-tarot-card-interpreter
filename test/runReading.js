

const readline = require("readline");
const drawCards = require("../logic/drawCards");
const classifyQuestion = require("../logic/classifyQuestion");
const assignRoles = require("../logic/spreadRoles");
const generateReading = require("../logic/generateReading");
const getYesNoVerdict = require("../logic/yesNoScore");
const rewriteWithAI = require("../logic/rewriteWithAI");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mysticalMessages = [
  "🃏 The cards are whispering their secrets...",
  "🔮 The tarot spirits are thinking...",
  "✨ The universe is aligning your answer...",
  "🌙 The arcane symbols are revealing their meaning..."
];

function getRandomMessage() {
  return mysticalMessages[Math.floor(Math.random() * mysticalMessages.length)];
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Ask your tarot question: ", async (question) => {
  try {
    console.log("\n🔮 Shuffling the tarot deck...\n");
await sleep(1200);

    const categories = classifyQuestion(question);
    

    let cards = drawCards();
    

    cards = assignRoles(cards);
    console.log("Your cards are:\n");

cards.forEach((card, index) => {
  console.log(`Card ${index + 1}: ${card.name} (${card.orientation})`);
});

console.log(getRandomMessage());
await sleep(1500);

console.log(getRandomMessage());
await sleep(1500);

console.log("");
    const reading = generateReading(cards, categories);
    

    const verdict = getYesNoVerdict(reading.score);
    

    
    const finalReading = await rewriteWithAI(
      question,
      reading.interpretations,
      verdict,
      categories
    );
    

   console.log("\n✨ Your Reading:\n");
console.log(finalReading);
  } catch (error) {
    console.error("\n[ERROR] Something went wrong:");
    console.error(error);
  } finally {
    rl.close();
  }
});