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
