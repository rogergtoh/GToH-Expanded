const dialogueEnter = [
'Ya got tokens?',
'Is poly really my long lost brother?',
"50% off on the @8(#$ in the back!",
"I miss my kids.",
"Ever heard of this place, VSAA? I heard there was this cool RPG coming out...",
"The matrix wasn't real.",
"Who? OBRO?!? I DONT WANT TO TALK ABOUT IT!!",
"bopeebo.",
"Midnight is my favorite time of night.",
"He he haw haw.",
"Just in time! I'm watching the Fortnite World Cup!",
"IM SPILLING GEMS! I don't wanna bust, help!",
"Guess how old I am? You'll guess wrong.",
"Whaddya Want?",
"My brother left me. No. No. I DONT NEED TO REMEMEBER AGAIN!",
"I bet you don't even have 3 tokens. Just get out now.",
"Money pays the bills. So pay me too.",
"Lookin' for some... pog... skins?",
"How were skins made... Just ripped off of other cubes? Bro. How rude.",
"Help. He's below. Help.",
"--- -... .-. --- / .. ... / -.-. --- -- .. -. --. .-.-.-",
"The final countdown! 5 tokens, maybe?"
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
  "I have to take this discord call, get out!",
  "You'll be back. Just how he was...",
  "Guppyadrian didn't create this world... Leave.",
  "Guppy speed!",
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

