let CurrentRank = 0;

const Ranks = [
  [0, "Novice"],
  [100, "Pioneer"],
  [250, "Bouncer"],
  [500, "Master of Pixels"]
  [1250, "Certified Cube"]
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

    const xpRewards = {
      Easy: 10,
      Medium: 20,
      Hard: 30,
      Extreme: 50,
      Insane: 70,
      Absurd: 150,
      Catastrophic: 500


    }

    // If not enough xp for next rank
    CurrentRank = curRank;
    return;
  }
  CurrentRank = curRank;
  return;
}