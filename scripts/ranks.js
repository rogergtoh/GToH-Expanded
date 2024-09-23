let CurrentRank = -1;

const Ranks = [
  [0, "Noob"],
  [10, "Novice"],
  [30, "Pioneer"],
  [250, "Bouncer"],
  [500, "Expert"],
  [850, "Master"],
  [1350, "Prodigy"],
  [2000, "Champion"],
  [3000, "Grandmaster"],
  [4000, "Supreme Champion"],
  [5500, "Ultimate Grandmaster"]
];

function updateXp() {
  LevelRewards["xp"] = 0;

  const xpRewards = {
    Easy: 10,
    Medium: 20,
    Hard: 300,
    Extreme: 50,
    Insane: 70,
    Absurd: 150,
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
  if (curRank >= 2)
    LevelRewards["RankTwoReward"] = 1;
  if (curRank >= 3)
    LevelRewards["RankThreeReward"] = 1;
  if (curRank >= 6)
    LevelRewards["RankSixReward"] = 1;
  if (curRank >= 7)
    LevelRewards["RankSevenReward"] = 1;
  if (CurrentRank < curRank && CurrentRank !== -1)
    AddChat("RANK UP: " + Ranks[curRank][1]);
  CurrentRank = curRank;
  return;
}