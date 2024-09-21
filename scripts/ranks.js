let CurrentRank = -1;

const Ranks = [
  [0, "Novice"],
  [100, "Pioneer"],
  [250, "Bouncer"],
  [500, "Master"],
  [1250, "Grandmaster"],
  [2250, "Ultimate Grandmaster"]
];

function updateXp() {
  LevelRewards["xp"] = 0;

  const xpRewards = {
    Easy: 10,
    Medium: 20,
    Hard: 30,
    Extreme: 50,
    Insane: 70,
    Absurd: 150,
    Catastrophic: 500
  }

  for (const diff of Object.keys(xpRewards)) {
    if (!(diff in LevelRewards)) break;

    LevelRewards["xp"] += xpRewards[diff] * LevelRewards[diff];
  }
}

function updateRank() {
  const xp = LevelRewards["xp"];
  let curRank = 0;
  for (const rankId in Ranks) {
    if (xp >= Ranks[rankId][0]) {
      curRank = parseInt(rankId);
      continue;
    }

    // If not enough xp for next rank
    break;
  }
  if (curRank >= 1)
    LevelRewards["RankTwoReward"] = 1;
  if (curRank >= 2)
    LevelRewards["RankThreeReward"] = 1;
  if (CurrentRank < curRank && CurrentRank !== -1)
    AddChat("RANK UP: " + Ranks[curRank][1]);
  CurrentRank = curRank;
  return;
}