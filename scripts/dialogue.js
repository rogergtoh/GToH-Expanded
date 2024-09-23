const dialogueEnter = [
'Its getting spoooookkkyyyyy...',
'Its getting spoooookkkyyyyy...'
];
const dialogueBought = [
  "+5 social credit",
  "Tra La La, the 'c' button actaully does something."
];
const dialogueLeave = [
  'Yeah whatever, bye.',
  "I never liked you anyway.",
  "bruh.",
  "qwerty.",   
  "And bid thee farewell...",
  "HE'S CHASING US. RUN. SAVE YOURSELF!",
  "Now back to watching Pokimane.",
  "Take it hardly.",
  "2 doors. 2 keys. [Double Key].",
  "I have to take this discord call, get out!",
  "You'll be back. Just how he was...",
  "Guppyadrian didn't create this world... Leave.",
  "Guppy speed!",
  "Go back to the [Scent of Spring].",
  "boy, I do want to live in an [Oasis Spire]...",
  "Adventure awaits, scrub.",
  "Leaving? You want me to leave for ANOTHER 5 months?",
  "Go back to where you came from. The towers.",
  "He'll be back.",
  "poiuytrewq."
];

function OpenDialogue(txt = null) {
  var txt = txt;
  if (txt === null) {
    txt = dialogueEnter[Math.floor(Math.random() * dialogueEnter.length)];
    if (Math.random() < 0.01) txt = 'Ẳ̵̡̫͎͍̞͎A̴̧̡̟͔̦̳͍͚̯͍̓͆͝Â̷̗̲̻̇́̋́̈́͝͝(̸̯̺̌̄̃̍̿͑̄̓͗̅̒́͘)̶̨̘̤͓̞̪̲̂̾̽̊̀̀̎̉̎̐͘̕͝ͅ/̷̧̛̦̞̯̄́̑̀̂̀̉̈́͋̈\̷̰̳̼̻̽̓͋͆̏͐̏͛̾̌̆̕/̴̻͎͇̺̭͆͌̂̔̂́̅̈́͑̂͘͘͘͝6̸̨̨͖̹͇̙͎̯̏͆ ̷̧̢̟̣̤̥̫̜̮͎̀͑̈̎̅͐̽̀̄̾͐͒̑͝U̷̢͖̖̟͙̙̖͈̟̱͙̽̊͋̆͜ŝ̷̢̨̛̛̹͈̼̖̜͙͔͇̯̿̽̾̌͋̏̂̈́̕';
  }
  if (!dialogueOpen) {
    dialogueOpen = true;
    world.push(new Dialogue(txt, ((Math.random() < 0.9) ? "dialogue.png" : "dialogueChad.png")));
  } else if (dialogueQueue < 5){
    dialogueQueue.push(txt);
  }
}

function ShopEnter() {
  const txt = dialogueEnter[Math.floor(Math.random() * dialogueEnter.length)];

    OpenDialogue(txt);
}

function ShopLeave() {
  const txt = dialogueLeave[Math.floor(Math.random() * dialogueLeave.length)];

  OpenDialogue(txt);
}
function AddChat(msg) {
  chatQueue.push([msg, 0]);
}

