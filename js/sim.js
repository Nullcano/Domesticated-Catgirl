$(window).on('load', function() {
  $("#loadingscreen").fadeOut();
});

$(document).ready(function() {
  var version="Alpha 4.3.0";
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
  items = {
    bedpurple: {
      cost: 2200,
      owned: 0,
      type: "decoration",
      name: "Bed | Purple",
      desc: "Purrple and comfy.",
    },
    dronebat: {
      cost: 4400,
      owned: 0,
      type: "decoration",
      name: "Drone | Bat",
      desc: "A spooky bat-looking drone.",
    },
    facemasksamurai: {
      cost: 330,
      owned: 0,
      type: "head",
      name: "Face Mask | Samurai",
      desc: "Surgical mask with a Japanese samurai print.",
    },
    glassespurpletint: {
      cost: 440,
      owned: 0,
      type: "head",
      name: "Glasses | Purple Tint",
      desc: "Sunglasses with a purple lens tint.",
    },
    hairwhite: {
      cost: 1100,
      owned: 0,
      type: "head",
      name: "Hair | White",
      desc: "Pearly white locks.",
    },
    hatredcap: {
      cost: 550,
      owned: 0,
      type: "head",
      name: "Hat | Red Cap",
      desc: "Red snapback with a paw print.",
    },
    miniskirtwhite: {
      cost: 2200,
      owned: 0,
      type: "bottoms",
      name: "Mini Skirt | White",
      desc: "A white miniskirt.",
    },
    shirtmars: {
      cost: 3300,
      owned: 0,
      type: "tops",
      name: "Shirt | Mars",
      desc: "This is a reference to SpaceX merch.",
    },
    shirttesla: {
      cost: 5500,
      owned: 0,
      type: "tops",
      name: "Shirt | Tesla",
      desc: "Tribute for when SpaceX sent a Tesla into orbit February 6, 2018.",
    },
    shortsdenim: {
      cost: 660,
      owned: 0,
      type: "bottoms",
      name: "Shorts | Denim",
      desc: "Basic blue denim shorts.",
    },
    tanktopblack: {
      cost: 110,
      owned: 0,
      type: "tops",
      name: "Tanktop | Black",
      desc: "Solid black tanktop.",
    },
    thighhighsrainbow: {
      cost: 220,
      owned: 0,
      type: "bottoms",
      name: "Thigh Highs | Rainbow",
      desc: "Is this considered a double rainbow?",
    },
    toppink: {
      cost: 990,
      owned: 0,
      type: "tops",
      name: "Top | Pink",
      desc: "Pink top with a lightning bolt print.",
    },
    potionresurrection: {
      cost: 100,
      owned: 1,
      img: "img/potionresurrection.gif",
      name: "Potion | Resurrection",
      desc: "Bring your pet back alive. Side-effect will turn her into a zombie.",
    }
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
    $("#catnipinv").text(catnip.inv);
    $(".petname").each(function(){$(this).text(character.pet.name)});
    $(".mastername").each(function(){$(this).text(character.master.name)});
  };

  $(".namebedpurple").each(function(){$(this).text(items.bedpurple.name)});
  $(".costbedpurple").each(function(){$(this).text(items.bedpurple.cost)});
  $(".descbedpurple").each(function(){$(this).text(items.bedpurple.desc)});
  $(".namedronebat").each(function(){$(this).text(items.dronebat.name)});
  $(".costdronebat").each(function(){$(this).text(items.dronebat.cost)});
  $(".descdronebat").each(function(){$(this).text(items.dronebat.desc)});
  $(".namefacemasksamurai").each(function(){$(this).text(items.facemasksamurai.name)});
  $(".costfacemasksamurai").each(function(){$(this).text(items.facemasksamurai.cost)});
  $(".descfacemasksamurai").each(function(){$(this).text(items.facemasksamurai.desc)});
  $(".nameglassespurpletint").each(function(){$(this).text(items.glassespurpletint.name)});
  $(".costglassespurpletint").each(function(){$(this).text(items.glassespurpletint.cost)});
  $(".descglassespurpletint").each(function(){$(this).text(items.glassespurpletint.desc)});
  $(".namehairwhite").each(function(){$(this).text(items.hairwhite.name)});
  $(".costhairwhite").each(function(){$(this).text(items.hairwhite.cost)});
  $(".deschairwhite").each(function(){$(this).text(items.hairwhite.desc)});
  $(".namehatredcap").each(function(){$(this).text(items.hatredcap.name)});
  $(".costhatredcap").each(function(){$(this).text(items.hatredcap.cost)});
  $(".deschatredcap").each(function(){$(this).text(items.hatredcap.desc)});
  $(".nameminiskirtwhite").each(function(){$(this).text(items.miniskirtwhite.name)});
  $(".costminiskirtwhite").each(function(){$(this).text(items.miniskirtwhite.cost)});
  $(".descminiskirtwhite").each(function(){$(this).text(items.miniskirtwhite.desc)});
  $(".nameshirtmars").each(function(){$(this).text(items.shirtmars.name)});
  $(".costshirtmars").each(function(){$(this).text(items.shirtmars.cost)});
  $(".descshirtmars").each(function(){$(this).text(items.shirtmars.desc)});
  $(".nameshirttesla").each(function(){$(this).text(items.shirttesla.name)});
  $(".costshirttesla").each(function(){$(this).text(items.shirttesla.cost)});
  $(".descshirttesla").each(function(){$(this).text(items.shirttesla.desc)});
  $(".nameshortsdenim").each(function(){$(this).text(items.shortsdenim.name)});
  $(".costshortsdenim").each(function(){$(this).text(items.shortsdenim.cost)});
  $(".descshortsdenim").each(function(){$(this).text(items.shortsdenim.desc)});
  $(".nametanktopblack").each(function(){$(this).text(items.tanktopblack.name)});
  $(".costtanktopblack").each(function(){$(this).text(items.tanktopblack.cost)});
  $(".desctanktopblack").each(function(){$(this).text(items.tanktopblack.desc)});
  $(".namethighhighsrainbow").each(function(){$(this).text(items.thighhighsrainbow.name)});
  $(".costthighhighsrainbow").each(function(){$(this).text(items.thighhighsrainbow.cost)});
  $(".descthighhighsrainbow").each(function(){$(this).text(items.thighhighsrainbow.desc)});
  $(".nametoppink").each(function(){$(this).text(items.toppink.name)});
  $(".costtoppink").each(function(){$(this).text(items.toppink.cost)});
  $(".desctoppink").each(function(){$(this).text(items.toppink.desc)});
  $(".imgpotionresurrection").each(function(){$(this).attr('src',items.potionresurrection.img)});
  $(".namepotionresurrection").each(function(){$(this).text(items.potionresurrection.name)});
  $(".costpotionresurrection").each(function(){$(this).text(items.potionresurrection.cost)});
  $(".descpotionresurrection").each(function(){$(this).text(items.potionresurrection.desc)});
  $(".imgsaymyname").attr("src",achievements.saymyname.img);
  $(".namesaymyname").each(function(){$(this).text(achievements.saymyname.name)});
  $(".descsaymyname").each(function(){$(this).text(achievements.saymyname.desc)});
  $(".xpsaymyname").each(function(){$(this).text(achievements.saymyname.xp)});
  $(".imgcatbabtism").attr("src",achievements.catbabtism.img);
  $(".namecatbabtism").each(function(){$(this).text(achievements.catbabtism.name)});
  $(".desccatbabtism").each(function(){$(this).text(achievements.catbabtism.desc)});
  $(".xpcatbabtism").each(function(){$(this).text(achievements.catbabtism.xp)});

  $("#editpetname").click(function() {
    character.pet.name = $('#petinput').val();
    $(".petname").text(character.pet.name);
    $("#talk").text(character.pet.name + "? Nice...")
    $("#talk").hide(0).delay(5000).show(0).delay(3000).hide(0);
    catbabtism();
    drawitems();
  });

  $("#editmastername").click(function() {
    character.master.name = $('#masterinput').val();
    $(".mastername").text(character.master.name);
    $("#talk").text("Nice to meet you, " + character.master.name + "!")
    $("#talk").hide(0).delay(5000).show(0).delay(3000).hide(0);
    saymyname();
    drawitems();
  });

  $(".catgirl").click(function() {
    var emote = ["(^ Ï‰ ^)", "(Â´ âˆ€ `)", "(â‰§ â—¡ â‰¦)", "(âŒ’ Ï‰ âŒ’)", "(Â¯ ï¸¶ Â¯)"];
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
    drawitems();
    setTimeout(function() {
      $(".popsaymyname").hide();
    }, 5000);
  }
  function catbabtism() {
    achievements.catbabtism.status=1;
    stats.gain_xp(achievements.catbabtism.xp);
    $(".popcatbabtism").show();
    achievement.play();
    drawitems();
    setTimeout(function() {
      $(".popcatbabtism").hide();
    }, 5000);
  }

  //Shop & Inventory
  $(".shop").on("click","#bed-purple",function(){stats.money>=items.bedpurple.cost?(stats.money=stats.money-items.bedpurple.cost,items.bedpurple.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".shop").on("click","#drone-bat",function(){stats.money>=items.dronebat.cost?(stats.money=stats.money-items.dronebat.cost,items.dronebat.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".shop").on("click","#facemask-samurai",function(){stats.money>=items.facemasksamurai.cost?(stats.money=stats.money-items.facemasksamurai.cost,items.facemasksamurai.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".shop").on("click","#glasses-purpletint",function(){stats.money>=items.glassespurpletint.cost?(stats.money=stats.money-items.glassespurpletint.cost,items.glassespurpletint.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".shop").on("click","#hair-white",function(){stats.money>=items.hairwhite.cost?(stats.money=stats.money-items.hairwhite.cost,items.hairwhite.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".shop").on("click","#hat-redcap",function(){stats.money>=items.hatredcap.cost?(stats.money=stats.money-items.hatredcap.cost,items.hatredcap.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".shop").on("click","#miniskirt-white",function(){stats.money>=items.miniskirtwhite.cost?(stats.money=stats.money-items.miniskirtwhite.cost,items.miniskirtwhite.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".shop").on("click","#shirt-mars",function(){stats.money>=items.shirtmars.cost?(stats.money=stats.money-items.shirtmars.cost,items.shirtmars.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".shop").on("click","#shirt-tesla",function(){stats.money>=items.shirttesla.cost?(stats.money=stats.money-items.shirttesla.cost,items.shirttesla.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".shop").on("click","#shorts-denim",function(){stats.money>=items.shortsdenim.cost?(stats.money=stats.money-items.shortsdenim.cost,items.shortsdenim.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".shop").on("click","#tanktop-black",function(){stats.money>=items.tanktopblack.cost?(stats.money=stats.money-items.tanktopblack.cost,items.tanktopblack.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".shop").on("click","#thighhighs-rainbow",function(){stats.money>=items.thighhighsrainbow.cost?(stats.money=stats.money-items.thighhighsrainbow.cost,items.thighhighsrainbow.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".shop").on("click","#top-pink",function(){stats.money>=items.toppink.cost?(stats.money=stats.money-items.toppink.cost,items.toppink.owned=1,pet.status.affection+=1,update(),drawitems()):($(".shoppingmall").hide(),$(".notify").show(),$(".notify .note").text("You can't afford this"))});
  $(".doc").on("click","#potion-resurrection",function(){stats.money>=items.potionresurrection.cost?(stats.money=stats.money-items.potionresurrection.cost,items.potionresurrection.owned=1,pet.status.affection+=1,update(),drawitems()):($(".notify").show(),$(".notify .note").text("You can't afford this"))});

  $(".inventory").on("click", "#bed-purple", function() { items.bedpurple.owned = 2; drawitems(); });
  $(".inventory").on("click", "#drone-bat", function() { items.dronebat.owned = 2; drawitems(); });
  $(".inventory").on("click", "#facemask-samurai", function() { items.facemasksamurai.owned = 2; drawitems(); });
  $(".inventory").on("click", "#glasses-purpletint", function() { items.glassespurpletint.owned = 2; drawitems(); });
  $(".inventory").on("click", "#hair-white", function() { items.hairwhite.owned = 2; drawitems(); });
  $(".inventory").on("click", "#hat-redcap", function() { items.hatredcap.owned = 2; drawitems(); });
  $(".inventory").on("click", "#miniskirt-white", function() { items.miniskirtwhite.owned = 2; drawitems(); });
  $(".inventory").on("click", "#shirt-mars", function() { items.shirtmars.owned = 2; drawitems(); });
  $(".inventory").on("click", "#shirt-tesla", function() { items.shirttesla.owned = 2; drawitems(); });
  $(".inventory").on("click", "#shorts-denim", function() { items.shortsdenim.owned = 2; drawitems(); });
  $(".inventory").on("click", "#tanktop-black", function() { items.tanktopblack.owned = 2; drawitems(); });
  $(".inventory").on("click", "#thighhighs-rainbow", function() { items.thighhighsrainbow.owned = 2; drawitems(); });
  $(".inventory").on("click", "#top-pink", function() { items.toppink.owned = 2; drawitems(); });
  $(".inventory").on("click", "#potion-resurrection", function() {
     if (Math.round(Math.random() * 1)) {
       pet.status.alive=2
     } else {
       pet.status.alive=1
     }
     pet.status.thirst=100
     pet.status.hunger=100
     petstatus();
   });


  $(".room").on("click", "#bed-purple", function() { items.bedpurple.owned = 1; drawitems(); });
  $(".room").on("click", "#drone-bat", function() { items.dronebat.owned = 1; drawitems(); });
  $(".room").on("click", "#facemask-samurai", function() { items.facemasksamurai.owned = 1; drawitems(); });
  $(".room").on("click", "#glasses-purpletint", function() { items.glassespurpletint.owned = 1; drawitems(); });
  $(".room").on("click", "#hair-white", function() { items.hairwhite.owned = 1; drawitems(); });
  $(".room").on("click", "#hat-redcap", function() { items.hatredcap.owned = 1; drawitems(); });
  $(".room").on("click", "#miniskirt-white", function() { items.miniskirtwhite.owned = 1; drawitems(); });
  $(".room").on("click", "#shirt-mars", function() { items.shirtmars.owned = 1; drawitems(); });
  $(".room").on("click", "#shirt-tesla", function() { items.shirttesla.owned = 1; drawitems(); });
  $(".room").on("click", "#shorts-denim", function() { items.shortsdenim.owned = 1; drawitems(); });
  $(".room").on("click", "#tanktop-black", function() { items.tanktopblack.owned = 1; drawitems(); });
  $(".room").on("click", "#thighhighs-rainbow", function() { items.thighhighsrainbow.owned = 1; drawitems(); });
  $(".room").on("click", "#top-pink", function() { items.toppink.owned = 1; drawitems(); });

  function drawitems() {
    if (items.bedpurple.owned===0) { $(".shop #bed-purple").show(); $(".inventory #bed-purple").hide(); $(".room #bed-purple").hide(); }
    if (items.bedpurple.owned===1) { $(".shop #bed-purple").hide(); $(".inventory #bed-purple").show(); $(".room #bed-purple").hide(); }
    if (items.bedpurple.owned===2) { $(".shop #bed-purple").hide(); $(".inventory #bed-purple").hide(); $(".room #bed-purple").show(); }
    if (items.dronebat.owned===0) { $(".shop #drone-bat").show(); $(".inventory #drone-bat").hide(); $(".room #drone-bat").hide(); }
    if (items.dronebat.owned===1) { $(".shop #drone-bat").hide(); $(".inventory #drone-bat").show(); $(".room #drone-bat").hide(); }
    if (items.dronebat.owned===2) { $(".shop #drone-bat").hide(); $(".inventory #drone-bat").hide(); $(".room #drone-bat").show(); }
    if (items.facemasksamurai.owned===0) { $(".shop #facemask-samurai").show(); $(".inventory #facemask-samurai").hide(); $(".room #facemask-samurai").hide(); }
    if (items.facemasksamurai.owned===1) { $(".shop #facemask-samurai").hide(); $(".inventory #facemask-samurai").show(); $(".room #facemask-samurai").hide(); }
    if (items.facemasksamurai.owned===2) { $(".shop #facemask-samurai").hide(); $(".inventory #facemask-samurai").hide(); $(".room #facemask-samurai").show(); }
    if (items.glassespurpletint.owned===0) { $(".shop #glasses-purpletint").show(); $(".inventory #glasses-purpletint").hide(); $(".room #glasses-purpletint").hide(); }
    if (items.glassespurpletint.owned===1) { $(".shop #glasses-purpletint").hide(); $(".inventory #glasses-purpletint").show(); $(".room #glasses-purpletint").hide(); }
    if (items.glassespurpletint.owned===2) { $(".shop #glasses-purpletint").hide(); $(".inventory #glasses-purpletint").hide(); $(".room #hair-white").show(); }
    if (items.hairwhite.owned===0) { $(".shop #hair-white").show(); $(".inventory #hair-white").hide(); $(".room #hair-white").hide(); }
    if (items.hairwhite.owned===1) { $(".shop #hair-white").hide(); $(".inventory #hair-white").show(); $(".room #hair-white").hide(); }
    if (items.hairwhite.owned===2) { $(".shop #hair-white").hide(); $(".inventory #hair-white").hide(); $(".room #hair-white").show(); }
    if (items.hatredcap.owned===0) { $(".shop #hat-redcap").show(); $(".inventory #hat-redcap").hide(); $(".room #hat-redcap").hide(); }
    if (items.hatredcap.owned===1) { $(".shop #hat-redcap").hide(); $(".inventory #hat-redcap").show(); $(".room #hat-redcap").hide(); }
    if (items.hatredcap.owned===2) { $(".shop #hat-redcap").hide(); $(".inventory #hat-redcap").hide(); $(".room #hat-redcap").show(); }
    if (items.miniskirtwhite.owned===0) { $(".shop #miniskirt-white").show(); $(".inventory #miniskirt-white").hide(); $(".room #miniskirt-white").hide(); }
    if (items.miniskirtwhite.owned===1) { $(".shop #miniskirt-white").hide(); $(".inventory #miniskirt-white").show(); $(".room #miniskirt-white").hide(); }
    if (items.miniskirtwhite.owned===2) { $(".shop #miniskirt-white").hide(); $(".inventory #miniskirt-white").hide(); $(".room #miniskirt-white").show(); }
    if (items.shirtmars.owned===0) { $(".shop #shirt-mars").show(); $(".inventory #shirt-mars").hide(); $(".room #shirt-mars").hide(); }
    if (items.shirtmars.owned===1) { $(".shop #shirt-mars").hide(); $(".inventory #shirt-mars").show(); $(".room #shirt-mars").hide(); }
    if (items.shirtmars.owned===2) { $(".shop #shirt-mars").hide(); $(".inventory #shirt-mars").hide(); $(".room #shirt-mars").show(); }
    if (items.shirttesla.owned===0) { $(".shop #shirt-tesla").show(); $(".inventory #shirt-tesla").hide(); $(".room #shirt-tesla").hide(); }
    if (items.shirttesla.owned===1) { $(".shop #shirt-tesla").hide(); $(".inventory #shirt-tesla").show(); $(".room #shirt-tesla").hide(); }
    if (items.shirttesla.owned===2) { $(".shop #shirt-tesla").hide(); $(".inventory #shirt-tesla").hide(); $(".room #shirt-tesla").show(); }
    if (items.shortsdenim.owned===0) { $(".shop #shorts-denim").show(); $(".inventory #shorts-denim").hide(); $(".room #shorts-denim").hide(); }
    if (items.shortsdenim.owned===1) { $(".shop #shorts-denim").hide(); $(".inventory #shorts-denim").show(); $(".room #shorts-denim").hide(); }
    if (items.shortsdenim.owned===2) { $(".shop #shorts-denim").hide(); $(".inventory #shorts-denim").hide(); $(".room #shorts-denim").show(); }
    if (items.tanktopblack.owned===0) { $(".shop #tanktop-black").show(); $(".inventory #tanktop-black").hide(); $(".room #tanktop-black").hide(); }
    if (items.tanktopblack.owned===1) { $(".shop #tanktop-black").hide(); $(".inventory #tanktop-black").show(); $(".room #tanktop-black").hide(); }
    if (items.tanktopblack.owned===2) { $(".shop #tanktop-black").hide(); $(".inventory #tanktop-black").hide(); $(".room #tanktop-black").show(); }
    if (items.thighhighsrainbow.owned===0) { $(".shop #thighhighs-rainbow").show(); $(".inventory #thighhighs-rainbow").hide(); $(".room #thighhighs-rainbow").hide(); }
    if (items.thighhighsrainbow.owned===1) { $(".shop #thighhighs-rainbow").hide(); $(".inventory #thighhighs-rainbow").show(); $(".room #thighhighs-rainbow").hide(); }
    if (items.thighhighsrainbow.owned===2) { $(".shop #thighhighs-rainbow").hide(); $(".inventory #thighhighs-rainbow").hide(); $(".room #thighhighs-rainbow").show(); }
    if (items.toppink.owned===0) { $(".shop #top-pink").show(); $(".inventory #top-pink").hide(); $(".room #top-pink").hide(); }
    if (items.toppink.owned===1) { $(".shop #top-pink").hide(); $(".inventory #top-pink").show(); $(".room #top-pink").hide(); }
    if (items.toppink.owned===2) { $(".shop #top-pink").hide(); $(".inventory #top-pink").hide(); $(".room #top-pink").show(); }
    if (items.potionresurrection.owned===1) { $(".inventory #potion-resurrection").show(); }
    if (achievements.saymyname.status===0) { $(".achievements .saymyname").hide(); }
    if (achievements.saymyname.status===1) { $(".achievements .saymyname").show(); }
    if (achievements.catbabtism.status===0) { $(".achievements .catbabtism").hide(); }
    if (achievements.catbabtism.status===1) { $(".achievements .catbabtism").show(); }
  }

  //Lock & Load
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
      "ownedbedpurple": items.bedpurple.owned,
      "owneddronebat": items.dronebat.owned,
      "ownedfacemasksamurai": items.facemasksamurai.owned,
      "ownedglassespurpletint": items.glassespurpletint.owned,
      "ownedhairwhite": items.hairwhite.owned,
      "ownedhatredcap": items.hatredcap.owned,
      "ownedminiskirtwhite": items.miniskirtwhite.owned,
      "ownedshirtmars": items.shirtmars.owned,
      "ownedshirttesla": items.shirttesla.owned,
      "ownedshortsdenim": items.shortsdenim.owned,
      "ownedtanktopblack": items.tanktopblack.owned,
      "ownedthighhighsrainbow": items.thighhighsrainbow.owned,
      "ownedtoppink": items.toppink.owned,
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
      "ownedbedpurple": items.bedpurple.owned,
      "owneddronebat": items.dronebat.owned,
      "ownedfacemasksamurai": items.facemasksamurai.owned,
      "ownedglassespurpletint": items.glassespurpletint.owned,
      "ownedhairwhite": items.hairwhite.owned,
      "ownedhatredcap": items.hatredcap.owned,
      "ownedminiskirtwhite": items.miniskirtwhite.owned,
      "ownedshirtmars": items.shirtmars.owned,
      "ownedshirttesla": items.shirttesla.owned,
      "ownedshortsdenim": items.shortsdenim.owned,
      "ownedtanktopblack": items.tanktopblack.owned,
      "ownedthighhighsrainbow": items.thighhighsrainbow.owned,
      "ownedtoppink": items.toppink.owned,
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
      items.bedpurple.owned = progress["ownedbedpurple"];
      items.dronebat.owned = progress["owneddronebat"];
      items.facemasksamurai.owned = progress["ownedfacemasksamurai"];
      items.glassespurpletint.owned = progress["ownedglassespurpletint"];
      items.hairwhite.owned = progress["ownedhairwhite"];
      items.hatredcap.owned = progress["ownedhatredcap"];
      items.miniskirtwhite.owned = progress["ownedminiskirtwhite"];
      items.shirtmars.owned = progress["ownedshirtmars"];
      items.shirttesla.owned = progress["ownedshirttesla"];
      items.shortsdenim.owned = progress["ownedshortsdenim"];
      items.tanktopblack.owned = progress["ownedtanktopblack"];
      items.thighhighsrainbow.owned = progress["ownedthighhighsrainbow"];
      items.toppink.owned = progress["ownedtoppink"];
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
    loadprogress();
    petstatus();
    drawitems();
  }
  boot();

});