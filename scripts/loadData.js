function syncProgress() {
  const lvls = localStorage.getItem("levels");
  const swaps = localStorage.getItem("swaps");
  const inv = localStorage.getItem('inventory');
  const dailyLvls = localStorage.getItem('dailysBeaten');
  console.log("synced levels")
  if (lvls != null) {
    levelsComplete = JSON.parse(lvls);
  }
  if (swaps != null) {
    swapsComplete = JSON.parse(swaps);
  }
  if (inv != null) {
    Inventory = JSON.parse(inv);
  }
  if (dailyLvls != null) {
    DailyLevelsBeaten = parseInt(dailyLvls);
  }

  syncRewards();

  updateAllStars();
}

function syncRewards() {
  LevelRewards = {};
  // Get all the level rewards
  for (const i in levelsComplete) {
    if (!(levelsComplete[i] > 0)) continue;
    if (!('reward' in lvlData[i])) continue;
    for (const b in lvlData[i].reward) {
      if (!(b in LevelRewards)) {
        LevelRewards[b] = lvlData[i].reward[b];
      } else {
        LevelRewards[b] += lvlData[i].reward[b];
      }
    }
  }

  // Daily level rewards
  if (!("StyleToken" in LevelRewards))
    LevelRewards["StyleToken"] = 0;
  LevelRewards["StyleToken"] += 10 * DailyLevelsBeaten;

  // then deduct points based off inventory
  for (const item in Inventory) {
    if (!(item in InventoryItems)) continue; // SKIPPA if item price is not listed.

    for (const cost in InventoryItems[item]) {
      if (!(cost in LevelRewards))
        LevelRewards[cost] = 0;
      LevelRewards[cost] -= InventoryItems[item][cost] * Inventory[item];

    }
  }

  // finally update xp & rank
  updateXp();
  updateRank();
}

function setSkin(skin) {
  PlayerSkin = cliDir + 'textures/skins/' + skin + ".png";
  Player.skin = skin;
  Player.img = PlayerSkin;
  PlayerSkinName = skin;
}

levelsComplete = new Array(lvlData.length).fill(false);
syncProgress()