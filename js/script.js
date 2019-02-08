window.addEventListener('load', function() {
  document.getElementById('preloader').style.display = 'none';
})

const version = "Beta 1.0";
let money = 0;
let moneyclick = 1;
let moneysec = 0;
let xp = 0;
let lvl = 1;
let lvlxp = 100;
let totalxp = 0;
const lvlcap = 42;

let level_up = function() {
  lvl += 1;
  totalxp += lvlxp;
  lvlxp = lvl * lvl * 100;
  updateNum();
};

let gain_xp = function(xp) {
  let _results;
  xp += xp;
  if (lvl >= lvlcap && xp > totalxp) {
    xp = totalxp;
  }
  _results = [];
  while (xp >= totalxp + lvlxp && lvl < lvlcap) {
    _results.push(level_up());
  }
  return _results;
};

let mastername = "Master";
let petname = "Pet";

let status = {
  alive: 2,
  thirst: 100,
  hunger: 100,
  affection: 0
};
let traits = {
  cat: {
    morph: 1, img: "url(img/girl-base.gif)"
  },
  dragon: {
    morph: 0, img: "url(img/girl-dragon.gif)"
  },
  fox: {
    morph: 0, img: "url(img/girl-fox.gif)"
  }
};
upgrades = {
  fasterlaptops: {
    cost: 8,
    amount: 0,
  },
  catcoinminer: {
    cost: 16,
    amount: 0,
  },
};
docshopitems = {
  potionresurrection: {
    cost: 100,
    owned: 1,
    type: "consumables",
    name: "Potion | Resurrection",
    desc: "Bring your pet back alive. Side-effect will turn her into a zombie.",
    img: "img/potion-resurrection.gif",
  },
};
achievements = {
  saymyname: {
    status: 0,
    xp: 50,
    img: "img/saymyname.gif",
    name: "Say My Name",
    desc: "You told her your name.",
  },
  catbabtism: {
    status: 0,
    xp: 50,
    img: "img/catbabtism.gif",
    name: "Cat Babtism",
    desc: "You named your catgirl.",
  },
};

var achievement = new Audio('sound/achievement.wav')
var click = new Audio('sound/click.wav');
var close = new Audio('sound/close.wav');
var open = new Audio('sound/open.wav');
var nya = new Audio('sound/nya.wav');

//Format numbers
function format(input) {
  if (input < Math.pow(10,3)) {
    return input; }
  else if (input >= Math.pow(10,3) && input < Math.pow(10,6)){
    return (input *Math.pow(10,3) / Math.pow(10,6)).toFixed(1) + " k"; }
  else if (input >= Math.pow(10,6) && input < Math.pow(10,9)){
    return (input *Math.pow(10,6) / Math.pow(10,12)).toFixed(1) + " m"; }
  else if (input >= Math.pow(10,9) && input < Math.pow(10,12)){
    return (input *Math.pow(10,9) / Math.pow(10,18)).toFixed(1) + " b"; }
  else if (input >= Math.pow(10,12) && input < Math.pow(10,15)){
    return (input *Math.pow(10,12) / Math.pow(10,24)).toFixed(1) + " t"; }
  else if (input >= Math.pow(10,15) && input < Math.pow(10,18)){
    return (input *Math.pow(10,15) / Math.pow(10,30)).toFixed(1) + " qd"; }
  else if (input >= Math.pow(10,18) && input < Math.pow(10,21)){
    return (input *Math.pow(10,18) / Math.pow(10,36)).toFixed(1) + " qt"; }
  else if (input >= Math.pow(10,21) && input < Math.pow(10,24)){
    return (input *Math.pow(10,21) / Math.pow(10,42)).toFixed(1) + " sx"; }
}

function updateNum() {
  document.title = "DCGS | " + version;
  document.getElementById('version').innerHTML = version;
  document.getElementById('money').innerHTML = format(money.toFixed(2));
  document.getElementById('moneysec').innerHTML = format(moneysec.toFixed(2));
  document.getElementById('level').innerHTML = lvl;
  document.getElementById('totalexperience').style.width = lvlxp;
  document.getElementById('thirst').innerHTML = status.thirst;
  document.getElementById('hunger').innerHTML = status.hunger;
  document.getElementById('affection').innerHTML = status.affection;
  document.getElementById('costfasterlaptops').innerHTML = upgrades.fasterlaptops.cost.toFixed(2);
  document.getElementById('amountfasterlaptops').innerHTML = upgrades.fasterlaptops.amount;
  document.getElementById('costcatcoinminer').innerHTML = upgrades.catcoinminer.cost.toFixed(2);
  document.getElementById('amountcatcoinminer').innerHTML = upgrades.catcoinminer.amount;
  document.getElementsByClassName('petname').innerHTML = petname;
  document.getElementsByClassName('mastername').innerHTML = mastername;
};

document.getElementById('editpetname').addEventListener('click', function() {
  document.getElementById('petinput').value = petname;
  document.getElementsByClassName('petname').text = petname;
  document.getElementById('talk').text = petname + '? Nice...';
  catbabtism();
});

document.getElementById('editmastername').addEventListener('click', function() {
  document.getElementById('masterinput').value = mastername;
  document.getElementsByClassName('mastername').text = mastername;
  document.getElementById('talk').text = 'Nice to meet you ' + mastername + '!';
  saymyname();
});

document.getElementById('catgirl').addEventListener('click', function() {
  var emote = ["(^ ω ^)", "(´ ∀ `)", "(≧ ◡ ≦)", "(⌒ ω ⌒)", "(¯ ︶ ¯)"];
  document.getElementById('emote').style.display = 'block';
  document.getElementById('emote').text = emote[Math.floor(Math.random() * emote.length)];
  setTimeout(function() {
    document.getElementById('emote').style.display = 'none';
  }, 2000);
  nya.play();
});

//Survival and feelings
setInterval(function() {
  status.thirst-=1
  petStatus()
}, 30000);
setInterval(function() {
  status.hunger-=1
  petStatus()
}, 60000);

function petStatus() {
  if(traits.cat.morph===1){
    document.getElementById('catgirl').style.background = traits.cat.img;
  }
  if(traits.dragon.morph===1){
    document.getElementById('catgirl').style.background = traits.dragon.img;
  }
  if(traits.fox.morph===1){
    document.getElementById('catgirl').style.background = traits.fox.img;
  }
  if(status.thirst===0 || status.hunger===0){
    status.alive=0
  }
}

//Money gain features
document.getElementById('work').addEventListener('click', function() {
  money += moneyclick;
  gain_xp(3);
  click.play();
  updateNum();
});

//Buy upgrades
document.getElementById('buyfasterlaptops').addEventListener('click', function() {
  if (money >= upgrades.fasterlaptops.cost) {
    money = money - upgrades.fasterlaptops.cost;
    upgrades.fasterlaptops.cost = upgrades.fasterlaptops.cost * 1.5;
    upgrades.fasterlaptops.amount = upgrades.fasterlaptops.amount + 1;
    moneyclick = moneyclick + 1;
    gain_xp(3);
    updateNum();
  } else {
    document.getElementById('upgradestore').style.display = 'none';
    document.getElementById('notify').style.display = 'block';
    document.getElementById('note').text = 'You can\'t afford this';
  }
});

document.getElementById('buycatcoinminer').addEventListener('click', function() {
  if (money >= upgrades.catcoinminer.cost) {
    money = money - upgrades.catcoinminer.cost;
    upgrades.catcoinminer.cost = upgrades.catcoinminer.cost * 1.5;
    upgrades.catcoinminer.amount = upgrades.catcoinminer.amount + 1;
    moneysec = moneysec + 1;
    gain_xp(3);
    updateNum();
  } else {
    document.getElementById('upgradestore').style.display = 'none';
    document.getElementById('notify').style.display = 'block';
    document.getElementById('note').text = 'You can\'t afford this';
  }
});

function timer() {
  money = money + moneysec;
  updateNum();
};
setInterval(timer, 1000);

//Catnip farm
catnip = {
  status: 1,
  inv: 0,
}

//Achievement get
function saymyname() {
  achievements.saymyname.status=1;
  gain_xp(achievements.saymyname.xp);
  document.getElementsByClassName('popsaymyname').style.display = 'block';
  achievement.play();
  setTimeout(function() {
    document.getElementsByClassName('popsaymyname').style.display = 'none';
  }, 5000);
}
function catbabtism() {
  achievements.catbabtism.status=1;
  gain_xp(achievements.catbabtism.xp);
  document.getElementsByClassName('popcatbabtism').style.display = 'block';
  achievement.play();
  setTimeout(function() {
    document.getElementsByClassName('popcatbabtism').style.display = 'none';
  }, 5000);
}

// Interface interactions
// Open pages
document.getElementById('opensim').addEventListener('click', function() {
  document.getElementById('sim').style.display = "flex";
  document.getElementById('options').style.display = "none";
  document.getElementById('wiki').style.display = "none";
  document.getElementById('about').style.display = "none";
});
document.getElementById('openoptions').addEventListener('click', function() {
  document.getElementById('sim').style.display = "none";
  document.getElementById('options').style.display = "flex";
  document.getElementById('wiki').style.display = "none";
  document.getElementById('about').style.display = "none";
});
document.getElementById('openwiki').addEventListener('click', function() {
  document.getElementById('sim').style.display = "none";
  document.getElementById('options').style.display = "none";
  document.getElementById('wiki').style.display = "flex";
  document.getElementById('about').style.display = "none";
});
document.getElementById('openabout').addEventListener('click', function() {
  document.getElementById('sim').style.display = "none";
  document.getElementById('options').style.display = "none";
  document.getElementById('wiki').style.display = "none";
  document.getElementById('about').style.display = "flex";
});
// Open objects
document.getElementById('wardrobe').addEventListener('click', function() {
  document.getElementById('openwardrobe').classList.remove('dn');
  open.play();
});
document.getElementById('closewardrobe').addEventListener('click', function() {
  document.getElementById('openwardrobe').classList.add('dn');
  close.play();
});
document.getElementById('door').addEventListener('click', function() {
  document.getElementById('map').classList.remove('dn');
  open.play();
});
document.getElementById('closemap').addEventListener('click', function() {
  document.getElementById('map').classList.add('dn');
  close.play();
});

//Lock & Load

function boot() {
  petStatus();
  updateNum();
}
boot();
