let xp = 0
let playerHealth = 100 
let magicDust = 50 
let currentWeapon = 0
let fighting = 0 
let monsterHealth; 
let inventory = ["stick"]

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const playerHealthText = document.querySelector("#playerHealthText");
const magicDustText = document.querySelector("#magicDustText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");


const weapons = [
    {
      name: "stick",
      power: 5
    },
    {
      name: "pocket knife",
      power: 30
    },
    {
      name: "samurai sword",
      power: 50
    },
    {
      name: "glock 47",
      power: 100
    }
  ];
  const monsters = [
    {
      name: "Old Creepy Man",
      level: 2,
      monsterHealth: 15
    },
    {
      name: "Angry Soccer Mom",
      level: 8,
      monsterHealth: 60
    },
    {
      name: "Unicorn",
      level: 20,
      monsterHealth: 300
    }
  ];
  const locations = [
    {
      name: "playground",
      "button text": ["Go to Store", "Go to Enchanted Forest", "Fight Unicorn"],
      "button functions": [goStore, goForest, fightUnicorn],
      text: "You are chilling at the playground. You see a sign that says \"Store.\""
    },
    {
      name: "store",
      "button text": ["Buy 10 Health (10 Magic Dust)", "Buy Weapon (30 Magic Dust)", "Go to Playground"],
      "button functions": [buyPlayerHealth, buyWeapon, goPlayground],
      text: "You enter the store."
    },
    {
      name: "Enchanted Forest",
      "button text": ["Fight Old Creepy Man", "Fight Angry Soccer Mom", "Go to Playground"],
      "button functions": [fightOldCreepyMan, fightAngrySoccerMom, goPlayground],
      text: "You entered the Enchanted Forest. You see some monsters."
    },
    {
      name: "fight",
      "button text": ["Attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goPlayground],
      text: "You are fighting a monster."
    },
    {
      name: "kill monster",
      "button text": ["Go to Playground", "Go to Playground", "Go to Playground"],
      "button functions": [goPlayground, goPlayground, goPlayground],
      text: 'The monster screams "dang nabit!" as it dies. You gain experience points and find magic dust.'
    },
    {
      name: "lose",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "You dead af boy"
    },
    {
      name: "win",
      "button text": ["AGAIN?", "AGAIN?", "AGAIN?"],
      "button functions": [restart, restart, restart],
      text: "You won... nice"
    },
    ]
button1.onclick = goStore;
button2.onclick = goForest;
button3.onclick = fightUnicorn;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location["text"];

  }

  function goPlayground() {
    update(locations[0]);
  }
  
  function goStore() {
    update(locations[1]);
  }
  
  function goForest() {
    update(locations[2]);
  }
  
  function buyPlayerHealth() {
    if (magicDust >= 10) {
      magicDust -= 10;
      playerHealth += 10;
      magicDustText.innerText = magicDust;
      playerHealthText.innerText = playerHealth;
    } else {
      text.innerText = "You do not have enough Magic Dust to buy health.";
    }
  
  }

  function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
      if (magicDust >= 30) {
        magicDust -= 30;
        currentWeapon++;
        magicDustText.innerText = magicDust;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You now have a " + newWeapon + ".";
        inventory.push(newWeapon);
        text.innerText += " In your inventory you have: " +  inventory.join(", ");
      } else {
        text.innerText = "You do not have enough magic dust to buy a weapon.";
      }
    } else {
      text.innerText = "You already have the most powerful weapon!";
      button2.innerText = "Sell weapon for 15 magic dust";
      button2.onclick = sellWeapon;
    }
  }

  function sellWeapon() {
    if (inventory.length > 1) {
      magicDust += 15;
      magicDustText.innerText = magicDust;
      let currentWeapon = inventory.shift();
      text.innerText = "You sold a " + currentWeapon + ".";
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "Nahhh, I am not buying yo" + currentWeapon.name + ".";
    }
  }

  function fightOldCreepyMan() {
    fighting = 0;
    goFight();
  }
  
  function fightAngrySoccerMom() {
    fighting = 1;
    goFight();
  }
  
  function fightUnicorn() {
    fighting = 2;
    goFight();
  }
  
  function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].monsterHealth;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
  }
  
  function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  
    if (isMonsterHit()) {
      playerHealth -= getMonsterAttackValue(monsters[fighting].level);
    } else {
      text.innerText += " You miss.";
    }

  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  playerHealthText.innerText = playerHealth;
  monsterHealthText.innerText = monsterHealth;
  if (playerHealth <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }

  if (Math.random() <= .1 && inventory.length > 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  let hit = (level * 5);
  console.log(hit);
  return hit;
}

function isMonsterHit() {
  return Math.random() > .2 || playerHealth < 20;
}


function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
  magicDust += Math.floor(monsters[fighting].level * 7)
  xp += monsters[fighting].level;
  magicDustText.innerText = magicDust;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  playerHealth = 100;
  magicDust = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  magicDustText.innerText = magicDust;
  playerHealthText.innerText = playerHealth;
  xpText.innerText = xp;
  goPlayground();
}
