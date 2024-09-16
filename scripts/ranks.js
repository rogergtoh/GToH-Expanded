let CurrentRank = 0;

const Ranks = [
  [0, "Noob"],
  [100, "Starter"],
  [1000, "Certified Cube"]
];

function updateRank() {
  const xp = LevelRewards["xp"];
  let curRank = 0;
  for (const rankId in Ranks) {
    console.log(rankId);
    console.log(Ranks[rankId][0]);
    if (xp >= Ranks[rankId][0]) {
      curRank = parseInt(rankId);
      continue;
    }

    // If not enough xp for next rank
    CurrentRank = curRank;
    return;
  }
  CurrentRank = curRank;
  return;
}