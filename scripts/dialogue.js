const dialogueEnter = [
'Ya got tokens?',
'Is poly really my long lost brother?',
"50% off on the @8(#$ in the.. where'd the back go?",
"I miss my kids.",
"Ever heard of this place, VSAA?",
"The matrix wasn't real.",
"Who? OBRO?!? NO! NOT AGAIN!",
"bopeebo.",
"How retro!",
"bro hop on fortnite it's 2020, wake up",
"This reminds me.. Back in my day...",
"I used to go to that old pub with Poly back then...",
"Woah! So retro!",
"I feel like im in a video game...",
"New.. interesting.. skins for sale!",
"Buy the Orbo Pass from the Seasonal World!",
"What's that purple goop up there?",
"Midnight is my favorite time of night.",
"He he he haw.",
"Just in time! I'm watching the Fortnite World Cup!",
"do da de da...",
"Guess how old I am? You'll guess wrong.",
"Whaddya Want?",
"My brother and me lost contact 3 months ago...",
"Get some tokens and come back. I'm not cheap!",
"Money pays the bills. So pay me too.",
"Lookin' for some... pog... skins?",
"How were skins made?",
"Help. He's below. Help.",
"--- -... .-. --- / .. ... / -.-. --- -- .. -. --. .-.-.-",
"The final countdown! 5 tokens, maybe?",
"Legendary? I've got a bone to pick with him about those!"
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
  "He caught up.",
  "Now back to watching Pokimane.",
  "Take it hardly.",
  "Whens GToH Expanded 0.4.0 coming out?",
  "I have to take this discord call, get out!",
  "You'll be back. Just how he was...",
  "Guppyadrian didn't create this world... Leave.",
  "Guppy speed!",
  "I smell a certain taste in the water..",
  "Yeah, GET OUT!",
  "Adventure awaits, scrub.",
  "Leaving? You want me to leave for ANOTHER 5 months?",
  "Go back to where you came from. The towers.",
  "He's back.",
  "zxcvbnm."
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
function AddChat(msg, uuid = "none", admin = 0) {
  chatQueue.push([msg, 0, uuid, admin]);
  console.log(admin);
}

