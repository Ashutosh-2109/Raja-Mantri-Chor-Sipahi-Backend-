const roles = ["Raja", "Mantri", "Chor", "Sipahi"];

function assignRoles(players) {
  const shuffled = [...roles].sort(() => Math.random() - 0.5);

  players.forEach((player, index) => {
    player.role = shuffled[index];
  });
}

module.exports = assignRoles;
