const InventoryItems = {
  "starskin": {StyleToken: 10},
  "suit": {StyleToken: 20},
  "ninja": {StyleToken: 20},
  "knight": {StyleToken: 25},
  "underwear": {StyleToken: 30},
  "elegant": {StyleToken: 45},
  "orboskin": {StyleToken: 50},
  "love": {StyleToken: 75}
};

function tryBuy(itemName, allowMultiple = false) {
  if (!checkReqs(InventoryItems[itemName])) return false;
  
  if (allowMultiple && (itemName in Inventory)) {
    Inventory[itemName] += 1;
  } else {
    Inventory[itemName] = 1;
  }
  localStorage.setItem('inventory', JSON.stringify(inventory));
  syncRewards();
  return true;
}