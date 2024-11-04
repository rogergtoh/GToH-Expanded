function syncProgress() {
  const lvls = localStorage.getItem("levels");
  const swaps = localStorage.getItem("swaps");
  const inv = localStorage.getItem('inventory');
  const dailyLvls = localStorage.getItem('dailysBeaten');
  const codes = localStorage.getItem('codesUsed');
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
  if (codes != null) {
    CodesUsed = JSON.parse(codes);
  }
  
  syncRewards();

  updateAllStars();
}

function syncRewards() {
  LevelRewards = {};
  // Get all the level rewards
  for (const i in levelsComplete) {
    if (!(levelsComplete[i] > 0)) continue;
    if (lvlData[i] === undefined) continue; //Edge case!
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
  LevelRewards["StyleToken"] += 15 * DailyLevelsBeaten;
  if (!("LToken" in LevelRewards))
  LevelRewards["LToken"] = 0;
LevelRewards["LToken"] += 1 * DailyLevelsBeaten;
if (!("Easy" in LevelRewards))
  LevelRewards["Easy"] = 0;
LevelRewards["Easy"] += 1 * DailyLevelsBeaten;

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

function setHat(hat) {
  if (hat === false) {
    PlayerHat = undefined;
  } else {
    PlayerHat = cliDir + 'textures/hats/' + hat + ".png";
  }
  Player.hat = PlayerHat;
}

levelsComplete = new Array(lvlData.length).fill(false);
syncProgress()



function exportSave() {
  const saveData = JSON.stringify(localStorage);


  if (socket == undefined) {
    let tab = window.open('about:blank', '_blank');
    tab.document.write(saveData);
    tab.document.close();
    return;
  } 

  socket.emit('encrypt save', saveData);
}

function importSave() {
  const p = prompt("enter save data.");
  if (p === "" || p === null || p === undefined) return false;

  if (socket == undefined) {
    const data = JSON.parse(p);
    updateLocalStorage(data);
    return;
  }

  socket.emit('decrypt save', p);
}

function updateLocalStorage(saveData) {
  for (const i in saveData) {
    localStorage.setItem(i, saveData[i]);
  }
  alert("Save updated. Please refresh your game.");
}

if (socket != undefined) {
  socket.on('encrypt save', saveData => {
    let tab = window.open('about:blank', '_blank');
    tab.document.write(saveData);
    tab.document.close();
  });

  socket.on('decrypt save', saveData => {
    updateLocalStorage(JSON.parse(saveData));
  });
}