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

