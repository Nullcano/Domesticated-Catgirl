$(document).ready(function() {
  var version = "Alpha 4.1.0";
  stats = {
    money: 0,
    moneyclick: 1,
    moneysec: 0,
    xp: 0,
    lvl: 1,
    lvlxp: 100,
    totalxp: 0,
    lvlcap: 30,
    level_up: function() {
      this.lvl += 1;
      this.totalxp += this.lvlxp;
      this.lvlxp = this.lvl * this.lvl * 100;
      update();
    },
    gain_xp: function(xp) {
      var _results;
      this.xp += xp;
      if (this.lvl >= this.lvlcap && this.xp > this.totalxp) {
        this.xp = this.totalxp;
      }
      _results = [];
      while (this.xp >= this.totalxp + this.lvlxp && this.lvl < this.lvlcap) {
        _results.push(this.level_up());
      }
      return _results;
    }
  };
  upgrades = {
    fasterlaptops: {
      cost: 10,
      amount: 0,
    },
    catcoinminer: {
      cost: 10,
      amount: 0,
    }
  };
  items = {
    bedpurple: {
      cost: 10,
      owned: 0,
      equip: 0,
      img: "url(img/bed.gif)",
      type: "decoration",
      name: "Bed | Purple",
      desc: "Purrple and comfy.",
    },
    dronebat: {
      cost: 10,
      owned: 0,
      equip: 0,
      img: "url(img/drone-bat.gif)",
      type: "decoration",
      name: "Drone | Bat",
      desc: "A spooky bat-looking drone.",
    },
    hairwhite: {
      cost: 10,
      owned: 0,
      equip: 0,
      img: "url(img/hair-white.gif)",
      type: "head",
      name: "Hair | White",
      desc: "Pearly white locks.",
    },
    shirtmars: {
      cost: 10,
      owned: 0,
      equip: 0,
      img: "url(img/shirt-mars.gif)",
      type: "tops",
      name: "Shirt | Mars",
      desc: "This is a reference to SpaceX merch.",
    },
    shirttesla: {
      cost: 10,
      owned: 0,
      equip: 0,
      img: "url(img/shirt-tesla.gif)",
      type: "tops",
      name: "Shirt | Tesla",
      desc: "Tribute for when SpaceX sent a Tesla into orbit February 6, 2018.",
    },
  }
  //achievements: { saymyname, cat babtism }
  $("#masternameok").click(function() {
    var mastername = document.getElementById("selectyourname").value;
    localStorage.setItem("yourname", mastername);
    document.getElementById("mastername").innerHTML = document.getElementById("selectyourname").value;
    $("#greet").text("Nice to meet you, " + mastername + "!")
    $("#greet").show();
    setTimeout(function() {
      $("#greet").hide();
    }, 3000);
  });
  $("#catgirlnameok").click(function() {
    var catgirlname = document.getElementById("selecthername").value;
    localStorage.setItem("hername", catgirlname);
    document.getElementById("catgirlname").innerHTML = document.getElementById("selecthername").value;
    $("#firstwords").text(catgirlname + "? Nice...")
    $("#firstwords").show();
    setTimeout(function() {
      $("#firstwords").hide();
    }, 3000);
  });
  $("#catgirl").click(function() {
    var emote = ["(^ ω ^)", "(´ ∀ `)", "(≧ ◡ ≦)", "(⌒ ω ⌒)", "(¯ ︶ ¯)"];
    $("#emote").show().text(emote[Math.floor(Math.random() * emote.length)]);
    setTimeout(function() {
      $("#emote").hide();
    }, 2000);
    nya.play();
  });
  $("#work").click(function() {
    stats.money = stats.money + stats.moneyclick;
    stats.gain_xp(3);
    update();
  });
  //Buy upgrades
  $("#buyfasterlaptops").click(function() {
    if (stats.money >= upgrades.fasterlaptops.cost) {
      stats.money = stats.money - upgrades.fasterlaptops.cost;
      upgrades.fasterlaptops.cost = upgrades.fasterlaptops.cost * 1.5;
      upgrades.fasterlaptops.amount = upgrades.fasterlaptops.amount + 1;
      stats.moneyclick = stats.moneyclick + 1;
      stats.gain_xp(3);
      update();
    } else {
      $(".upgradestore").hide();
      $(".notifypoor").show();
    }
  });
  $("#buycatcoinminer").click(function() {
    if (stats.money >= upgrades.catcoinminer.cost) {
      stats.money = stats.money - upgrades.catcoinminer.cost;
      upgrades.catcoinminer.cost = upgrades.catcoinminer.cost * 1.5;
      upgrades.catcoinminer.amount = upgrades.catcoinminer.amount + 1;
      stats.moneysec = stats.moneysec + 1;
      stats.gain_xp(3);
      update();
    } else {
      $(".upgradestore").hide();
      $(".notifypoor").show();
    }
  });

  function timer() {
    stats.money = stats.money + stats.moneysec;
    update();
  };
  setInterval(timer, 1000);
  //Shop & Inventory
  $(".shop #bed-purple").click(function() {
    if (stats.money >= items.bedpurple.cost) {
      stats.money = stats.money - items.bedpurple.cost;
      items.bedpurple.owned = 1;
      update();
      itemowned();
    } else {
      $(".shoppingmall").hide();
      $(".notifypoor").show();
      poor();
    }
  });
  $(".shop #drone-bat").click(function() {
    if (stats.money >= items.dronebat.cost) {
      stats.money = stats.money - items.dronebat.cost;
      items.dronebat.owned = 1;
      update();
      itemowned();
    } else {
      $(".shoppingmall").hide();
      $(".notifypoor").show();
      poor();
    }
  });

  function itemowned() {
    switch (items.bedpurple.owned) {
      case 0:
        $(".shop #bed-purple").show();
        $(".inventory #bed-purple").hide();
        break;
      case 1:
        $(".shop #bed-purple").hide();
        $(".inventory #bed-purple").show();
        break;
      default:
        $(".shop #bed-purple").show();
        $(".inventory #bed-purple").hide();
    }
    switch (items.dronebat.owned) {
      case 0:
        $(".shop #drone-bat").show();
        $(".inventory #drone-bat").hide();
        break;
      case 1:
        $(".shop #drone-bat").hide();
        $(".inventory #drone-bat").show();
        break;
      default:
        $(".shop #drone-bat").show();
        $(".inventory #drone-bat").hide();
    }
  };

  function boot() {
    loadprogress();
  }
  boot();
