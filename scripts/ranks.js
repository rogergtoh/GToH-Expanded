let CurrentRank = -1;

const Ranks = [
  [0, "Noob (0)"],
  [30, "Novice (1)"],
  [100, "Pioneer (2)"],
  [200, "Bouncer (3)"],
  [350, "Profecient (4)"],
  [500, "Expert (5)"],
  [750, "Master (6)"],
  [1000, "Legend (7)"],
  [1400, "Prodigy (8)"],
  [1850, "Champion (9)"],
  [2300, "Grandmaster (10)"],
  [2800, "Elite Prodigy (11)"],
  [3500, "Supreme Champion (12)"],
  [4250, "Soverign Expert (13)"],
  [5250, "Uncontested Legend (14)"],
  [6500, "Ultimate Grandmaster (15)"]
];

function updateXp() {
  LevelRewards["xp"] = 0;

  const xpRewards = {
    Easy: 10,
    Medium: 20,
    Hard: 30,
    Intense: 40,
    Extreme: 50,
    Remorseless: 60,
    Insane: 70,
    Absurd: 150,
    GrandEXP: 500,
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
    LevelRewards["RankOneReward"] = 1;
   if (curRank >= 2)
    LevelRewards["RankTwoReward"] = 1;
   if (curRank >= 3)
    LevelRewards["RankThreeReward"] = 1;
   if (curRank >= 4)
    LevelRewards["RankFourReward"] = 1;
   if (curRank >= 6)
    LevelRewards["RankSixReward"] = 1;
   if (curRank >= 8)
    LevelRewards["RankEightReward"] = 1;
   if (curRank >= 10)
    LevelRewards["RankTenReward"] = 1;
  if (CurrentRank < curRank && CurrentRank !== -1)
    AddChat("RANK UP: " + Ranks[curRank][1]);
  CurrentRank = curRank;
  return;
}