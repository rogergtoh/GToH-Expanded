const CurrentRank = 0;

const Ranks = [
  [0, "Noob"],
  [100, "Starter"],
  [1000, "Certified Cube"]
];

function updateRank() {
  const xp = LevelRewards["xp"];
  let curRank = 0;
  for (const rankId in Ranks) {
    if (xp >= Ranks[rankId][0]) {
      curRank = rankId;
      continue;
    }

    // If not enough xp for next rank
    CurrentRank = curRank;
    return;
  }
}