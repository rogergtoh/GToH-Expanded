console.log("loading variables...")
var warning = false; //set to true if redesgining code that could potentially break game

// Game version!!
const GAMEVERSION = [0,7,0];

// These are for checking server compatibility, only change these if updating information sent/received by the server
const ClientVersion = 2;
const MinimumServerVersion = 2;

//draw
var drawQueue = [];
var drawTextQueue = [];
var images = {};
const ctx = myCanvas.getContext('2d');
var pressTab = false;

//cam
var camX = -myCanvas.width / 2;
var camY = 0;
var camZ = 1;
var shakeX = 0;
var shakeY = 0;
var shakeZ = 0;

//player
var playerX = 0;
var playerY = 0;
var pressLeft = false;
var pressRight = false;
var pressUp = false;
var prevTouchIcy = false;
var prevMudJump = false;
var prevTouchConveyor = false;
var ReplayKeys = [];
var ReplayPos = [];
var Replaying = false;
var LevelRewards = {};
var Inventory = {};

//world
var OtherPlayers = {};
var world = [];
var worldText = [];
var worldParticle = [];
const melonImg = "https://s2js.com/img/etc/watermelon2.png";
const playerImg = cliDir + "textures/skins/player.png";
var PlayerSkin = playerImg; // change this to based off PlayerSkinName
var PlayerSkinName = "player";

//misc
var redActive = 1;
var levelFormat = 1;
var perLevel = [];
var WorldId = -2;
var LevelWon = false;
var Timer = 0;
var TimesSwapped = 0;
var Ticker = 0;
var LobbyWorld = -2;
var RecentLevel = -2;
var GAME;
var levelsComplete = [];
var swapsComplete = [];
var worldRecords = [];
var startTime = 0;
var cheatsEnabled = false;
var TasMode = false;
var GamePaused = false;
var ChatOpen = false;
var peopleLeft = 0;
var DailyLevelsBeaten = 0;

//online
var ClientNumber;
var login;
var Username = '';
var Ping = 0;
var pressTab = false;

//music
var songList = {};
var prevSong = 'main';
var curSong = 'main';

//build mode
var CREATE;
var IsBuilding = false;
var placeX = 0;
var placeY = 0;
var point1 = [];
var mouseDown = false;
var leftDown = false;
var rightDown = false;
var upDown = false;
var downDown = false;
var blockType = 'block';
var rootBlockType = 'block';
var blockNbt = {tags: []};
var creatorBlocks = [];
var creatorHistory = [];
var PlayTest = false;
var cursorImg = cliDir + 'textures/block.png';
var Grid = true;
var ignoreWarning = false;
var spawnPos = [150,60];

//dialogue
var dialoguetick = 0;
var dialogueText = '';
var dialogueQueue = [];
var dialogueOpen = false;

//chat
var chatQueue = [];
var chatLogs = [];

function colliding(x, y, w, h, x2, y2, w2, h2) {
  if (x < x2 + w2 && x + w > x2) {

    if (y < y2 + h2 && y + h > y2) {

      return true;
    }
  }
  return false;
}
function fcoll(obj, obj2) {
  return colliding(obj.x, obj.y, obj.width, obj.height, obj2.x, obj2.y, obj2.width, obj2.height);
}

function getPlayerIdByName(name) {
  for (const plyr in OtherPlayers) {
    if (OtherPlayers[plyr].user === name) {
      return plyr;
    }
  }
  return false;
}

// Checks if your LevelRewards match up with reqs
function checkReqs(reqs) {
  for (const req in reqs) {
    if (!(req in LevelRewards)) return false;
    if (LevelRewards[req] < reqs[req]) 
      return false
  }
  return true;
}


var preloadList = [
  'block',
  'blueblock',
  'bounceDown',
  'grassblock',
  'yellowblock',
  'vines',
  'skins/player',
  'bounce',
  'bounceUp',
  'metalblock',
  'orangeblock',
  'redblock',
  'iceblock',
  'mudblock',
  'skullblock',
  'purpleblock'
];

songList['main'] = new Audio(cliDir + 'music/main.mp3');
songList['main'].loop = true;
songList['main'].volume = 0.1;
  
{
  let imagesLoaded = 0;
  for (b of preloadList) {
    const bb = cliDir + `textures/${b}.png`;
    images[bb] = new Image();
    images[bb].src = bb;
    images[bb].onload = () => {
      imagesLoaded++;
      if (imagesLoaded === preloadList.length) {
        setTimeout(() => {
          addEventListener('keydown', () => {
          songList['main'].play();
        }, {once : true});
        }, 1000);
        
      }
    }
  }
}

function seedRandom(a) {
  a |= 0;
  a = a + 0x9e3779b9 | 0;
  let t = a ^ a >>> 16;
  t = Math.imul(t, 0x21f0aaad);
  t = t ^ t >>> 15;
  t = Math.imul(t, 0x735a2d97);
  return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
}

function getCurrentDay(manualDate) {
  let day = new Date();
  if (manualDate !== undefined)
    day = new Date(manualDate);

  return day.getDate() + day.getMonth() * 31 + day.getFullYear() * 372;
}

function getDailyLevel(manualDate) {  
  let seed = getCurrentDay(manualDate) // Get seed from day
  let num = Math.round(seedRandom(seed ** 2) * 100000); // Turn to random num
  return (num % 140) + 1; // Constrain to only include id's that have a level
}