const InventoryItems = {
  "item1": {StyleToken: 2, Orbuck: 2}
};

function tryBuy(itemName, allowMultiple = false) {
  if (!checkReqs(InventoryItems[itemName])) return false;
  
  if (allowMultiple && (itemName in Inventory)) {
    Inventory[itemName] += 1;
  } else {
    Inventory[itemName] = 1;
  }
  syncRewards();
  return true;
}