const InventoryItems = {
  "starskin": {StyleToken: 10},
  "suit": {StyleToken: 10},
  "ninja": {StyleToken: 10},
  "knight": {StyleToken: 15},
  "underwear": {StyleToken: 15},
  "ghaster": {StyleToken: 25},
  "gd1": {StyleToken: 25},
  "elegant": {StyleToken: 35},
  "orboskin": {StyleToken: 45},
  "love": {StyleToken: 75},
  "backpacker": {Season2Token: 1},
  "pencil": {Season2Token: 1},
  "nerd": {EliteSeason2Token: 1},
  "eraser": {EliteSeason2Token: 1},
  "wetsuit": {SeasonToken: 1},
  "lifeguard": {SeasonToken: 1},
  "bikini": {SeasonToken: 1},
  "diving": {SeasonToken: 2}
};

function tryBuy(itemName, allowMultiple = false) {
  if (!checkReqs(InventoryItems[itemName]) && !(itemName in Inventory)) return false;
  
  if (allowMultiple && (itemName in Inventory)) {
    Inventory[itemName] += 1;
  } else {
    Inventory[itemName] = 1;
  }
  localStorage.setItem('inventory', JSON.stringify(Inventory));
  syncRewards();
  return true;
}