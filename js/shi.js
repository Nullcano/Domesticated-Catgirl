$(document).ready(function(){
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

  //Sounds
  var nya = new Audio('sound/nya.wav');
  var dooropen = new Audio('sound/dooropen.wav');
  var doorclose = new Audio('sound/doorclose.wav');
  $("#mute").click(function() {
    $(this).addClass("o-50");
    dooropen.muted = true;
    doorclose.muted = true;
  });

  function update() {
    $("#version").text(version);
    $("#money").text(stats.money.toFixed(2));
    $("#moneysec").text(stats.moneysec.toFixed(2));
    $("#totalxp").text(stats.xp);
    $("#level").text(stats.lvl);
    $("#stats_exp_to_next_level").html(stats.lvlxp + stats.totalxp - Math.floor(stats.xp));
    $("#experience").attr("value", stats.xp - stats.totalxp);
    $("#experience").attr("max", stats.lvlxp);
    $("#costfasterlaptops").text(upgrades.fasterlaptops.cost.toFixed(2));
    $("#amountfasterlaptops").text(upgrades.fasterlaptops.amount);
    $("#costcatcoinminer").text(upgrades.catcoinminer.cost.toFixed(2));
    $("#amountcatcoinminer").text(upgrades.catcoinminer.amount);
    $(".namebedpurple").each(function(){$(this).text(items.bedpurple.name)});
    $(".costbedpurple").each(function(){$(this).text(items.bedpurple.cost)});
    $(".descbedpurple").each(function(){$(this).text(items.bedpurple.desc)});
    $(".namedronebat").each(function(){$(this).text(items.dronebat.name)});
    $(".costdronebat").each(function(){$(this).text(items.dronebat.cost)});
    $(".descdronebat").each(function(){$(this).text(items.dronebat.desc)});
    $(".namehairwhite").each(function(){$(this).text(items.hairwhite.name)});
    $(".costhairwhite").each(function(){$(this).text(items.hairwhite.cost)});
    $(".deschairwhite").each(function(){$(this).text(items.hairwhite.desc)});
  };

  $("#masternameok").click(function(){
    var mastername = document.getElementById("selectyourname").value;
    localStorage.setItem("yourname",mastername);
    document.getElementById("mastername").innerHTML = document.getElementById("selectyourname").value;
    $("#greet").text("Nice to meet you, " + mastername + "!")
    $("#greet").show();
    setTimeout(function() {
      $("#greet").hide();
    }, 3000);
  });

  $("#catgirlnameok").click(function(){
    var catgirlname = document.getElementById("selecthername").value;
    localStorage.setItem("hername",catgirlname);
    document.getElementById("catgirlname").innerHTML = document.getElementById("selecthername").value;
    $("#firstwords").text(catgirlname + "? Nice...")
    $("#firstwords").show();
    setTimeout(function() {
      $("#firstwords").hide();
    }, 3000);
  });

  $("#catgirl").click(function(){
    var emote = ["(^ ω ^)","(´ ∀ `)","(≧ ◡ ≦)","(⌒ ω ⌒)","(¯ ︶ ¯)"];
    $("#emote").show().text(emote[Math.floor(Math.random() * emote.length)]);
    setTimeout(function() {
      $("#emote").hide();
    }, 2000);
    nya.play();
  });
  $("#work").click(function(){
    stats.money=stats.money+stats.moneyclick;
    stats.gain_xp(3);
    update();
  });

  //Buy upgrades
  $("#buyfasterlaptops").click(function(){
    if (stats.money>=upgrades.fasterlaptops.cost) {
      stats.money=stats.money-upgrades.fasterlaptops.cost;
      upgrades.fasterlaptops.cost=upgrades.fasterlaptops.cost*1.5;
      upgrades.fasterlaptops.amount=upgrades.fasterlaptops.amount+1;
      stats.moneyclick=stats.moneyclick+1;
      stats.gain_xp(3);
      update();
    } else {
      $(".upgradestore").hide();
      $(".notifypoor").show();
    }
  });

  $("#buycatcoinminer").click(function(){
    if (stats.money>=upgrades.catcoinminer.cost) {
      stats.money=stats.money-upgrades.catcoinminer.cost;
      upgrades.catcoinminer.cost=upgrades.catcoinminer.cost*1.5;
      upgrades.catcoinminer.amount=upgrades.catcoinminer.amount+1;
      stats.moneysec=stats.moneysec+1;
      stats.gain_xp(3);
      update();
    } else {
      $(".upgradestore").hide();
      $(".notifypoor").show();
    }
  });

  function timer() {
    stats.money=stats.money+stats.moneysec;
    update();
  };
  setInterval(timer, 1000);

  //Shop & Inventory
  $(".shop #bed-purple").click(function() {
    if (stats.money>=items.bedpurple.cost) {
      stats.money=stats.money-items.bedpurple.cost;
      items.bedpurple.owned=1;
      update();
      itemowned();
    } else {
      $(".shoppingmall").hide();
      $(".notifypoor").show();
      poor();
    }
  });
  $(".shop #drone-bat").click(function() {
    if (stats.money>=items.dronebat.cost) {
      stats.money=stats.money-items.dronebat.cost;
      items.dronebat.owned=1;
      update();
      itemowned();
    } else {
      $(".shoppingmall").hide();
      $(".notifypoor").show();
      poor();
    }
  });

  function itemowned() {
    switch(items.bedpurple.owned) {
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
    switch(items.dronebat.owned) {
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

  //Popups
  $("#door").click(function() {
    $(".megamenu").show();
    dooropen.play();
  });
  $("#closemegamenu").click(function() {
    $(".megamenu").hide();
    doorclose.play();
  });
  $("#wardrobe").click(function() {
    $(".openwardrobe").show();
  });
  $("#gotoupgradestore").click(function() {
    $(".upgradestore").show();
    $(".megamenu").hide();
  });
  $("#gotoshoppingmall").click(function() {
    $(".shoppingmall").show();
    $(".megamenu").hide();
  });
  $("#gotolootcrateshop").click(function() {
    $(".lootcrateshop").show();
    $(".megamenu").hide();
  });
  $("#closewardrobe").click(function() {
    $(".openwardrobe").hide();
  });
  $("#exitupgradestore").click(function() {
    $(".upgradestore").hide();
  });
  $("#exitshoppingmall").click(function() {
    $(".shoppingmall").hide();
  });
  $("#exitlootcrateshop").click(function() {
    $(".lootcrateshop").hide();
  });
  //Notifications
  $("#closepoor").click(function() {
    $(".notifypoor").hide();
  });

  //Lock & Load
  setInterval(function(){
    var save = {
      "money": stats.money,
      "xp": stats.xp,
      "lvl": stats.lvl,
      "lvlxp": stats.lvlxp,
      "totalxp": stats.totalxp,
      "lvlcap": stats.lvlcap,
      "fasterlaptops": upgrades.fasterlaptops,
      "costfasterlaptops": upgrades.fasterlaptops.cost,
      "amountfasterlaptops": upgrades.fasterlaptops.amount,
      "ownedbedpurple": items.bedpurple.owned,
      "equipbedpurple": items.bedpurple.equip,
      "owneddronebat": items.dronebat.owned,
      "equipdronebat": items.dronebat.equip,
    };
    localStorage.setItem("save",JSON.stringify(save));
  }, 10000);

  $("#save").click(function(){
    var save = {
      "money": stats.money,
      "xp": stats.xp,
      "lvl": stats.lvl,
      "lvlxp": stats.lvlxp,
      "totalxp": stats.totalxp,
      "lvlcap": stats.lvlcap,
      "fasterlaptops": upgrades.fasterlaptops,
      "costfasterlaptops": upgrades.fasterlaptops.cost,
      "amountfasterlaptops": upgrades.fasterlaptops.amount,
      "ownedbedpurple": items.bedpurple.owned,
      "equipbedpurple": items.bedpurple.equip,
      "owneddronebat": items.dronebat.owned,
      "equipdronebat": items.dronebat.equip,
    };
    localStorage.setItem("save",JSON.stringify(save));
  });

  function loadprogress() {
    if (localStorage.getItem("save") !== null) {
      var progress = JSON.parse(localStorage.getItem("save"));
      stats.money = progress["money"];
      stats.xp = progress["xp"];
      stats.lvl = progress["lvl"];
      stats.lvlxp = progress["lvlxp"];
      stats.totalxp = progress["totalxp"];
      stats.lvlcap = progress["lvlcap"];
      upgrades.fasterlaptops = progress["fasterlaptops"];
      upgrades.fasterlaptops.cost = progress["costfasterlaptops"];
      upgrades.fasterlaptops.amount = progress["amountfasterlaptops"];
      items.bedpurple.owned = progress["ownedbedpurple"];
      items.bedpurple.equip = progress["equipbedpurple"];
      items.dronebat.owned = progress["owneddronebat"];
      items.dronebat.equip = progress["equipdronebat"];
      update();
    }
  };
  function boot() {
    loadprogress();
  }
  boot();

  //UI stuff

  //Randomize things
  function poor() {
    var confirm = [
      "Fuck...",
      "Shit...",
      "Damn...",
      "Fine...",
      "REEEEE!"
    ];
    $("#confirm").text(confirm[Math.floor(Math.random() * confirm.length)]);
  };
});
