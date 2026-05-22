function getYesNoVerdict(score) {

  if (score >= 4) return "strong yes";
  if (score >= 2) return "leaning yes";
  if (score === 1) return "slight yes";
  if (score === 0) return "unclear";
  if (score <= -4) return "strong no";
  if (score <= -2) return "leaning no";

  return "slight no";
}

module.exports = getYesNoVerdict;