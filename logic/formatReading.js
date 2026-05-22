function capitalizeVerdict(verdict) {
  if (verdict === "strong yes") return "a very loud yes";
  if (verdict === "leaning yes") return "a cautious yes";
  if (verdict === "slight yes") return "a soft yes";
  if (verdict === "unclear") return "a frustrating maybe";
  if (verdict === "slight no") return "a soft no";
  if (verdict === "leaning no") return "a fairly clear no";
  return "a dramatic no";
}

function formatCardParagraph(card, index) {
  if (card.role === "current energy") {
    return `Card ${index + 1} — ${card.name} (${card.orientation}): Currently, ${card.meaning}. The advice here is simple: ${card.advice}.`;
  }

  if (card.role === "obstacle or hidden factor") {
    return `Card ${index + 1} — ${card.name} (${card.orientation}): A hidden complication appears here — ${card.meaning}. Watch out for this, and remember: ${card.advice}.`;
    }
  if (card.role === "likely direction or advice") {
    return `Card ${index + 1} — ${card.name} (${card.orientation}): Looking ahead, ${card.meaning}. Best move: ${card.advice}.`;
  }

  return `Card ${index + 1} — ${card.name} (${card.orientation}): ${card.meaning}. Advice: ${card.advice}.`;
}

function buildLoveEnding() {
  return `So in love terms, this feels less like a reckless “just do it” and more like “be real, be calm, and stop letting fantasy do all the talking.” If you confess, do it because you are ready to be honest — not because your brain is tired of suspense.`;
}

function buildCareerEnding() {
  return `So in career terms, there is potential here, but the outcome depends on whether you move with strategy and clarity instead of emotion alone.`;
}

function buildStudyEnding() {
  return `So in study terms, this is less about raw ability and more about whether your current mindset and habits actually support the result you want.`;
}

function buildProgressEnding() {
    return `So in practical terms, this looks less like fate magically handing you a result, and more like a question of consistency, timing, and how well you handle the process. The outcome is still shaped by what you do next.`;
}

function buildGeneralEnding() {
  return `Overall, the message is to stay aware of what is happening now, be honest about what is getting in the way, and move forward with more clarity than panic.`;
}

function formatCombinedParagraph(question, verdict, categories, interpretations) {
  const verdictLine = capitalizeVerdict(verdict);

  const card1 = interpretations[0];
  const card2 = interpretations[1];
  const card3 = interpretations[2];

  let combinedParagraph = `Combined Reading: For your question "${question}", the cards are giving ${verdictLine}. `;
  combinedParagraph += `At the moment, ${card1.meaning}. `;
  combinedParagraph += `What may be complicating things is that ${card2.meaning}. `;
  combinedParagraph += `Looking ahead, ${card3.meaning}. `;

 if (categories.includes("love")) {
  combinedParagraph += buildLoveEnding();
} else if (categories.includes("career")) {
  combinedParagraph += buildCareerEnding();
} else if (categories.includes("study")) {
  combinedParagraph += buildStudyEnding();
} else if (categories.includes("progress")) {
  combinedParagraph += buildProgressEnding();
} else {
  combinedParagraph += buildGeneralEnding();
}

  return combinedParagraph;
}

function formatReading(question, interpretations, verdict, categories) {
  const cardParagraphs = interpretations.map((card, index) =>
    formatCardParagraph(card, index)
  );

  const combinedParagraph = formatCombinedParagraph(
    question,
    verdict,
    categories,
    interpretations
  );

  return {
    cardParagraphs,
    combinedParagraph
  };
}

module.exports = formatReading;