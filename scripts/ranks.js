let CurrentRank = -1;

const Ranks = [
  [0, "Noob"],
  [10, "Novice"],
  [30, "Pioneer"],
  [150, "Bouncer"],
  [450, "Expert"],
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
    Easy: 1,
    Medium: 1,
    Hard: 1,
    Extreme: 1,
    Insane: 1,
    Absurd: 1,
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