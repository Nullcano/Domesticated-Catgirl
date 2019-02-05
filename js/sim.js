$(window).on('load', function() {
  $("#loadingscreen").fadeOut();
});

$(document).ready(function() {
  let version="Beta 1.0";
  stats={
    money:0,moneyclick:1,moneysec:0,
    xp:0,lvl:1,lvlxp:100,totalxp:0,lvlcap:42,
    level_up:function(){this.lvl+=1,this.totalxp+=this.lvlxp,this.lvlxp=this.lvl*this.lvl*100,update()},
    gain_xp:function(l){var t;for(this.xp+=l,this.lvl>=this.lvlcap&&this.xp>this.totalxp&&(this.xp=this.totalxp),t=[];this.xp>=this.totalxp+this.lvlxp&&this.lvl<this.lvlcap;)t.push(this.level_up());return t}
  };
  character={
    pet:{name:"Pet"},
    master:{name:"Master"},
  };
  pet={
    status:{alive:2,thirst:100,hunger:100,affection:0,},
    cat:{morph:1,img:"url(img/girl-base.gif)",},
    dragon:{morph:0,img:"url(img/girl-dragon.gif)",},
    fox:{morph:0,img:"url(img/girl-fox.gif)",},
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
  shopitems = {
    bedpurple: {
      cost: 2200,
      owned: 0,
      type: "decoration",
      name: "Bed | Purple",
      desc: "Purrple and comfy.",
      img: "img/bed-purple.gif",
    },
    dronebat: {
      cost: 4400,
      owned: 0,
      type: "decoration",
      name: "Drone | Bat",
      desc: "A spooky bat-looking drone.",
      img: "img/drone-bat.gif",
    },
    facemasksamurai: {
      cost: 330,
      owned: 0,
      type: "head",
      name: "Face Mask | Samurai",
      desc: "Surgical mask with a Japanese samurai print.",
      img: "img/facemask-samurai.gif",
    },
    glassespurpletint: {
      cost: 440,
      owned: 0,
      type: "head",
      name: "Glasses | Purple Tint",
      desc: "Sunglasses with a purple lens tint.",
      img: "img/glasses-purpletint.gif",
    },
    hairwhite: {
      cost: 1100,
      owned: 0,
      type: "head",
      name: "Hair | White",
      desc: "Pearly white locks.",
      img: "img/hair-white.gif",
    },
    hatredcap: {
      cost: 550,
      owned: 0,
      type: "head",
      name: "Hat | Red Cap",
      desc: "Red snapback with a paw print.",
      img: "img/hat-redcap.gif",
    },
    miniskirtwhite: {
      cost: 2200,
      owned: 0,
      type: "bottoms",
      name: "Mini Skirt | White",
      desc: "A white miniskirt.",
      img: "img/miniskirt-white.gif",
    },
    shirtmars: {
      cost: 3300,
      owned: 0,
      type: "tops",
      name: "Shirt | Mars",
      desc: "This is a reference to SpaceX merch.",
      img: "img/shirt-mars.gif",
    },
    shirttesla: {
      cost: 5500,
      owned: 0,
      type: "tops",
      name: "Shirt | Tesla",
      desc: "Tribute for when SpaceX sent a Tesla into orbit February 6, 2018.",
      img: "img/shirt-tesla.gif",
    },
    shortsdenim: {
      cost: 660,
      owned: 0,
      type: "bottoms",
      name: "Shorts | Denim",
      desc: "Basic blue denim shorts.",
      img: "img/shorts-denim.gif",
    },
    tanktopblack: {
      cost: 110,
      owned: 0,
      type: "tops",
      name: "Tanktop | Black",
      desc: "Solid black tanktop.",
      img: "img/tanktop-black.gif",
    },
    thighhighsrainbow: {
      cost: 220,
      owned: 0,
      type: "bottoms",
      name: "Thigh Highs | Rainbow",
      desc: "Is this considered a double rainbow?",
      img: "img/thighhighs-rainbow.gif",
    },
    toppink: {
      cost: 990,
      owned: 0,
      type: "tops",
      name: "Top | Pink",
      desc: "Pink top with a lightning bolt print.",
      img: "img/top-pink.gif",
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

  function renderItem (x) {
    return [
      '<div class="item">',
        '<div style="background-image:url(' + x.img + ')"></div>',
        '<span>'+ x.name +'</span>',
        '<span>Price: '+ x.cost +'</span>',
        '<span>'+ x.desc +'</span>',
      '</div>'
    ].join('');
  }

  function renderItems (targets, xs) {
    $.each(xs, function(key, item) {
      if (item.owned >= 0 && item.owned < targets.length) {
        targets[item.owned].append(renderItem(item));
      }
    });
  }

  function clickItem (jq, f) {
    return jq.on('click', '.item', f);
  }

  //Cool numbers
  function fixnumber(input) {
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

  function update() {
    $("#version").text(version);
    $("#money").text(fixnumber(stats.money.toFixed(2)));
    $("#moneysec").text(stats.moneysec.toFixed(2));
    $("#level").text(stats.lvl);
    $("#stats_exp_to_next_level").text(stats.lvlxp + stats.totalxp - Math.floor(stats.xp));
    $("#experience").attr("value", stats.xp - stats.totalxp);
    $("#experience").attr("max", stats.lvlxp);
    $("#thirst").attr("value", pet.status.thirst);
    $("#thirst").attr("max", 100);
    $("#hunger").attr("value", pet.status.hunger);
    $("#hunger").attr("max", 100);
    $("#affection").attr("value", pet.status.affection);
    $("#affection").attr("max", 100);
    $("#costfasterlaptops").text(upgrades.fasterlaptops.cost.toFixed(2));
    $("#amountfasterlaptops").text(upgrades.fasterlaptops.amount);
    $("#costcatcoinminer").text(upgrades.catcoinminer.cost.toFixed(2));
    $("#amountcatcoinminer").text(upgrades.catcoinminer.amount);
    //$("#catnipinv").text(catnip.inv);
    $(".petname").each(function(){$(this).text(character.pet.name)});
    $(".mastername").each(function(){$(this).text(character.master.name)});
  };

  $("#editpetname").click(function() {
    character.pet.name = $('#petinput').val();
    $(".petname").text(character.pet.name);
    $("#talk").text(character.pet.name + "? Nice...")
    $("#talk").hide(0).delay(5000).show(0).delay(3000).hide(0);
    catbabtism();
  });

  $("#editmastername").click(function() {
    character.master.name = $('#masterinput').val();
    $(".mastername").text(character.master.name);
    $("#talk").text("Nice to meet you, " + character.master.name + "!")
    $("#talk").hide(0).delay(5000).show(0).delay(3000).hide(0);
    saymyname();
  });

  $(".catgirl").click(function() {
    var emote = ["(^ ω ^)", "(´ ∀ `)", "(≧ ◡ ≦)", "(⌒ ω ⌒)", "(¯ ︶ ¯)"];
    $("#emote").show().text(emote[Math.floor(Math.random() * emote.length)]);
    setTimeout(function() {
      $("#emote").hide();
    }, 2000);
    nya.play();
  });

//Survival and feelings
  setInterval(function() {
    pet.status.thirst-=1
    petstatus()
  }, 30000);
  setInterval(function() {
    pet.status.hunger-=1
    petstatus()
  }, 60000);

  function petstatus(){
    if(pet.cat.morph===1){
      $(".catgirl").css("background", ""+pet.cat.img+"");
    }
    if(pet.dragon.morph===1){
      $(".catgirl").css("background", ""+pet.dragon.img+"");
    }
    if(pet.fox.morph===1){
      $(".catgirl").css("background", ""+pet.fox.img+"");
    }
    if(pet.status.thirst===0 || pet.status.hunger===0){
      pet.status.alive=0
    }
    if(pet.status.alive===0){
      $(".room").append('<div class="rip"></div>');
      $(".catgirl").hide();
    }
    if(pet.status.alive===1){
      $(".rip").hide();
      $(".catgirl").show();
      $(".zombify").show();
    }
    if(pet.status.alive===2){
      $(".rip").hide();
      $(".catgirl").show();
      $(".zombify").hide();
    }
  }

//Money gain features
  $("#work").click(function() {
    stats.money = stats.money + stats.moneyclick;
    stats.gain_xp(3);
    click.play();
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
      $(".notify").show();
      $(".notify .note").text("You can't afford this");
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
      $(".notify").show();
      $(".notify .note").text("You can't afford this");
    }
  });

  function timer() {
    stats.money = stats.money + stats.moneysec;
    update();
  };
  setInterval(timer, 1000);

  //Catnip farm
  catnip = {
    status: 1,
    inv: 0,
  }

  if (catnip.status==1) {
    $(".catnip").each(function() {
      $(this).addClass("ready");
    })
  }

  $(".catnip.ready").each(function(index) {
    $(this).on("click", function() {
      catnip.status=0;
      catnip.inv+=+1;
      $(this).removeClass("ready").delay(10000).queue(function() {
        $(this).addClass("ready").dequeue();
      });
      update();
    });
  });

  //Achievement get
  function saymyname() {
    achievements.saymyname.status=1;
    stats.gain_xp(achievements.saymyname.xp);
    $(".popsaymyname").show();
    achievement.play();
    setTimeout(function() {
      $(".popsaymyname").hide();
    }, 5000);
  }
  function catbabtism() {
    achievements.catbabtism.status=1;
    stats.gain_xp(achievements.catbabtism.xp);
    $(".popcatbabtism").show();
    achievement.play();
    setTimeout(function() {
      $(".popcatbabtism").hide();
    }, 5000);
  }

  //Lock & Load

  function loadState () { // was: loadprogress
    var state = localStorage.getItem('save');
    if (state) {
      items = JSON.parse(state);
    }
  }
  function saveState () {
    localStorage.setItem('save', JSON.stringify(items));
  }

  function bootstrap () {
    var $shop = $('#shop'),
        $room = $('#room'),
        $inventory = $('#inventory');

    loadState();

    clickItem($shop, function () {
      //Set item owned to 1 to store in #inventory
    });
    clickItem($inventory, function () {
      //Set item owned to 2 to display in #room
    });
    clickItem($room, function() {
      //Set item owned to 1 to move back to to #inventory
    });

    renderItems([$shop, $inventory, $room], items);
    setInterval(saveState, 10000);
  }

  setInterval(function(){
    var save = {
      "money": stats.money,
      "moneyclick": stats.moneyclick,
      "moneysec": stats.moneysec,
      "xp": stats.xp,
      "lvl": stats.lvl,
      "lvlxp": stats.lvlxp,
      "totalxp": stats.totalxp,
      "lvlcap": stats.lvlcap,
      "petname": character.pet.name,
      "mastername": character.master.name,
      "petalive": pet.status.alive,
      "costfasterlaptops": upgrades.fasterlaptops.cost,
      "amountfasterlaptops": upgrades.fasterlaptops.amount,
      "costcatcoinminer": upgrades.catcoinminer.cost,
      "amountcatcoinminer": upgrades.catcoinminer.amount,
      "statussaymyname": achievements.saymyname.status,
      "statuscatbabtism": achievements.catbabtism.status,
    };
    localStorage.setItem("save",JSON.stringify(save));
  }, 10000);

  $("#save").click(function(){
    var save = {
      "money": stats.money,
      "moneyclick": stats.moneyclick,
      "moneysec": stats.moneysec,
      "xp": stats.xp,
      "lvl": stats.lvl,
      "lvlxp": stats.lvlxp,
      "totalxp": stats.totalxp,
      "lvlcap": stats.lvlcap,
      "petname": character.pet.name,
      "mastername": character.master.name,
      "petalive": pet.status.alive,
      "costfasterlaptops": upgrades.fasterlaptops.cost,
      "amountfasterlaptops": upgrades.fasterlaptops.amount,
      "costcatcoinminer": upgrades.catcoinminer.cost,
      "amountcatcoinminer": upgrades.catcoinminer.amount,
      "statussaymyname": achievements.saymyname.status,
      "statuscatbabtism": achievements.catbabtism.status,
    };
    localStorage.setItem("save",JSON.stringify(save));
  });

  function loadprogress() {
    if (localStorage.getItem("save") !== null) {
      var progress = JSON.parse(localStorage.getItem("save"));
      stats.money = progress["money"];
      stats.moneyclick = progress["moneyclick"];
      stats.moneysec = progress["moneysec"];
      stats.xp = progress["xp"];
      stats.lvl = progress["lvl"];
      stats.lvlxp = progress["lvlxp"];
      stats.totalxp = progress["totalxp"];
      stats.lvlcap = progress["lvlcap"];
      character.pet.name = progress["petname"];
      character.master.name = progress["mastername"];
      pet.status.alive = progress["petalive"];
      upgrades.fasterlaptops.cost = progress["costfasterlaptops"];
      upgrades.fasterlaptops.amount = progress["amountfasterlaptops"];
      upgrades.catcoinminer.cost = progress["costcatcoinminer"];
      upgrades.catcoinminer.amount = progress["amountcatcoinminer"];
      achievements.saymyname.status = progress["statussaymyname"];
      achievements.catbabtism.status = progress["statuscatbabtism"];
      update();
    }
    if (localStorage.getItem("mastername") !== null) {
      $("#editmastername").text("Fee: 5000").css("color", "red");
      $("#editmastername").prop("disabled", true);
      $("#editmastername").click(function() {
        if (stats.money >= 5000) { $(this).prop("disabled", false).css("color", "white"); stats.money = stats.money - 5000; update(); }
        else { $(".notifypoor").show(); poor(); }
      });
    }
    if (localStorage.getItem("petname") !== null) {
      $("#editpetname").text("Fee: 5000").css("color", "red");
      $("#editpetname").prop("disabled", true);
      $("#editpetname").click(function() {
        if (stats.money >= 5000) { $(this).prop("disabled", false).css("color", "white"); stats.money = stats.money - 5000; update(); }
        else { $(".notifypoor").show(); poor(); }
      });
    }
  };

  function boot() {
    bootstrap();
    loadprogress();
    petstatus();
  }
  boot();

});
