const InventoryItems = {
  "starskin": {StyleToken: 10},
  "suit": {StyleToken: 10},
  "ninja": {StyleToken: 10},
  "knight": {StyleToken: 15},
  "underwear": {StyleToken: 15},
  "ghaster": {StyleToken: 25},
  "gd1": {StyleToken: 25},
  "elegant": {StyleToken: 30},
  "orboskin": {StyleToken: 35},
  "love": {StyleToken: 20},
  "glare": {StyleToken: 15},
  "grumpy": {StyleToken: 30},
  "wxp": {StyleToken: 30},
  "nerd": {StyleToken: 40},
  "backpacker": {LToken: 10},
  "pencil": {Season2Token: 1, StyleToken: 10},
  "eraser": {EliteSeason2Token: 1, StyleToken: 10},
  "wetsuit": {SeasonToken: 1},
  "lifeguard": {LToken: 10},
  "bikini": {SeasonToken: 1},
  "diving": {SeasonToken: 2},
  "pumpkinskin": {Season3Token: 2, StyleToken: 10},
  "scared": {Season3Token: 3, StyleToken: 10},
  "something": {Season3Token: 3, StyleToken: 10},
  "pumpkinhat": {Season3Token: 2, StyleToken: 10},
  "ghostlyskin": {HalloweenTicket: 1},
  "LTopHat": {LToken: 30},
  "iconic": {LToken: 20},
  "polskin2": {LToken: 20},
  "wxp": {LToken: 25},
  "LegendaryKey": {LToken: 10, StyleToken: 75},
  "paidorbopass4": {LToken: 20, StyleToken: 200},
  "dev": {fakeCurrency: 1000},
  "fleshy": {fakeCurrency: 1000},
  "fleshy2": {fakeCurrency: 1000},
  "checken": {fakeCurrency: 1000}
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
function redeemCode(code) {
  if(code == "" || code == null) return;
  if (socket == undefined) {
    AddChat("Not connected to server.");
    return;
  }
  socket.emit("code", code);
  
}