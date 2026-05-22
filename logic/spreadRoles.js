function assignRoles(cards) {

  const roles = [
    "current energy",
    "obstacle or hidden factor",
    "likely direction or advice"
  ];

  return cards.map((card, index) => ({
    ...card,
    role: roles[index]
  }));

}

module.exports = assignRoles;