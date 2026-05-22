function classifyQuestion(question) {
  const q = question.toLowerCase().trim();

  const categories = [];

  // Yes/No detection
  const yesNoStarters = [
    "will",
    "should",
    "can",
    "could",
    "would",
    "is",
    "are",
    "do",
    "does",
    "did",
    "am"
  ];

  const firstWord = q.split(/\s+/)[0];
  if (yesNoStarters.includes(firstWord)) {
    categories.push("yes_no");
  }

  // Keyword groups
  const loveKeywords = [
    "love",
    "relationship",
    "crush",
    "partner",
    "boyfriend",
    "girlfriend",
    "dating",
    "romance",
    "romantic",
    "feelings",
    "heartbreak",
    "ex",
    "marriage"
  ];

  const careerKeywords = [
    "career",
    "job",
    "work",
    "boss",
    "office",
    "promotion",
    "internship",
    "salary",
    "company",
    "business",
    "interview"
  ];

  const studyKeywords = [
    "study",
    "exam",
    "exams",
    "school",
    "gpa",
    "grade",
    "grades",
    "university",
    "test",
    "assignment",
    "semester",
    "class",
    "classes",
    "module",
    "modules"
  ];

  const progressKeywords = [
    "progress",
    "improve",
    "improvement",
    "better",
    "worse",
    "recover",
    "recovery",
    "growth",
    "develop",
    "development"
  ];

  const decisionKeywords = [
    "choose",
    "choice",
    "decision",
    "decide",
    "whether",
    "which",
    "option",
    "path"
  ];

  function containsWholeWord(keywordList) {
    return keywordList.some((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "i");
      return regex.test(q);
    });
  }

  if (containsWholeWord(loveKeywords)) {
    categories.push("love");
  }

  if (containsWholeWord(careerKeywords)) {
    categories.push("career");
  }

  if (containsWholeWord(studyKeywords)) {
    categories.push("study");
  }

  if (containsWholeWord(progressKeywords)) {
    categories.push("progress");
  }

  if (containsWholeWord(decisionKeywords)) {
    categories.push("decision");
  }

  // Fallback
  if (
    !categories.includes("love") &&
    !categories.includes("career") &&
    !categories.includes("study") &&
    !categories.includes("progress") &&
    !categories.includes("decision")
  ) {
    categories.push("general");
  }

  return categories;
}

module.exports = classifyQuestion;