//Sounds
var nya = new Audio('sound/nya.wav');
var dooropen = new Audio('sound/dooropen.wav');
var doorclose = new Audio('sound/doorclose.wav');
$("#mute").click(function() {
  $(this).addClass("o-50");
  nya.muted = true;
  dooropen.muted = true;
  doorclose.muted = true;
});

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

//Sort items
$('.menu li').click(function() {
  $(this).parent().find('li.active').removeClass('active');
  $(this).addClass('active');
  var type = $(this).attr('data-type');
  filterCards(type);
});
function filterCards(type) {
  showAllCards('.list','div');
  if (type == "all") {
    showAllCards('.list','div');
  } else {
    $(".list").find("div[data-type!=" + type + "]").each(function (i) {
      $(this).hide();
    });
  }
};
function showAllCards(parent, finding) {
  $(parent).find(finding).each(function(i) {
    $(this).show();
  })
};

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
