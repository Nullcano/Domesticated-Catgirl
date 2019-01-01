$(document).ready(function(){
  function displayTime(){
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();

    if (minutes < 10){
      minutes = "0" + minutes;
    }
    var meridiem = "AM";
    if (hours > 12){
      hours = hours - 12;
      meridiem = "PM";
    }
    if (hours < 10){
      hours = "0" + hours;
    }
    if (hours === 0 ){
      hours = 12;
    }
    var clockDiv = document.getElementById('clock');
    clockDiv.innerText = hours + ":" + minutes + " " + meridiem;
  }
  displayTime();
  setInterval(displayTime, 1000);

  function daycycle(){
    var currentTime = new Date();
    var hours = currentTime.getHours();

    if(hours>=6 && hours<=11){
      document.getElementById('window').style.backgroundImage = "url(img/outside-day.gif)";
      document.getElementById('greeting').innerHTML = "Good morning, Master!";
    }
    if(hours>=12 && hours<=16) {
      document.getElementById('window').style.backgroundImage = "url(img/outside-day.gif)";
      document.getElementById('greeting').innerHTML = "Good day, Master!";
    }
    if(hours>=17 && hours<=19) {
      document.getElementById('window').style.backgroundImage = "url(img/outside-day.gif)";
      document.getElementById('greeting').innerHTML = "Good afternoon, Master!";
    }
    if((hours>=20 && hours<=23) || (hours>=0 && hours<=5)) {
      document.getElementById('window').style.backgroundImage = "url(img/outside-day.gif)";
      document.getElementById('greeting').innerHTML = "Good night, Master!";
    }
  }
  daycycle();
  setInterval(daycycle, 1000);

  function calendar(){
    var currentTime = new Date();
    var weekday = new Array(7);
    weekday[0]=  "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    var day = weekday[currentTime.getDay()];
    var d = currentTime.getDate();
    var month = new Array(12);
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var m = month[currentTime.getUTCMonth()];
    var total = day + ", " + m + " " + d;

    document.getElementById('cal').innerHTML = total;
  }
  calendar();
  setInterval(calendar, 1000);
});

// change scenes
$('#home').click(function() {
  $('.home').addClass('db').removeClass('dn');
  $('.store').addClass('dn').removeClass('db');
  $('.gifts').addClass('dn').removeClass('db');
});

$('#store').click(function() {
  $('.home').addClass('dn').removeClass('db');
  $('.store').addClass('db').removeClass('dn');
  $('.gifts').addClass('dn').removeClass('db');
});

$('#gifts').click(function() {
  $('.home').addClass('dn').removeClass('db');
  $('.store').addClass('dn').removeClass('db');
  $('.gifts').addClass('db').removeClass('dn');
});

// currency and mechanics
var gameData = {
  currency: {
    money : 0,
    xp : 0,
  },
  work: {
    jobLevel : 1,
    salaryLevel : 1
  }
}

var profile_unlocked = false;

var upgrade_level = 0;

var upgrade_path = [
  {"id" : "profile_btn", 'text' : "Buy Profile", "unlocks" : 'profile', 'cost' : 5},
  {"id" : "gifts_btn", 'text' : "Buy Shop", "unlocks" : 'shop', 'cost' : 10},
  {"id" : "profile_name", 'text' : "Buy Profile Name", "unlocks" : 'namePlate', 'cost' : 10}
];

$(document).ready(function(){

  loadGame();

  renderUpgrade();

  $('#home, #work, #store, #gifts').off().on('click',function(){
    gameData.currency.xp += 1;
    $('#disp_xp').text(gameData.currency.xp);
  });
});

function renderUpgrade(purchased = false){

  purchased ? upgrade_level += 1 : null;
  $('#upgrades .upgrade').remove();

  $('#upgrades h2').after("<input type='button' class='upgrade' id='"+upgrade_path[upgrade_level].id+"'  value='"+upgrade_path[upgrade_level].text+"'>");

  $('.upgrade').off().on('click',function(){
    if(gameData.currency.money >= upgrade_path[upgrade_level].cost){
       gameData.currency.money -= upgrade_path[upgrade_level].cost;
       $('#' + upgrade_path[upgrade_level].unlocks).show();
       renderUpgrade(true);
    }
    else{
      console.log('broke');
    }
  });
}

function update() {
  gameData.currency.money += gameData.work.salaryLevel;
   updateDisp();
}

function updateDisp(){
  //console.log(upgrade_level);
    $('#disp_money').text(gameData.currency.money);
}

function saveGame(){
  Cookies.set("gameData",gameData);
  eventLog('Progress saved!');
}

function loadGame(){
  var gameCookie = Cookies.getJSON("gameData");
  if(gameCookie){
    gameData = gameCookie;
  }
}

function randomEvent(){
  var chance = Math.random();
  if(chance > .35){
    var choice = Math.random();
    if(choice > .95){
      //lotto
      var winnings = Math.floor(.5 * gameData.currency.money);
      eventLog('You won the lotto! $' + winnings + ' deposited.');
      gameData.currency.money+= winnings;
    }else{
      //bill
      var losses = Math.floor(.2 * gameData.currency.money);
      eventLog('Utility bill undercharge! $' + losses + ' withdrawn.');
      gameData.currency.money-= losses;
    }
  }
}

function eventLog(text){
  $('#eventLog').prepend("<li>" + text + "</li>");
  $('#eventLog li:gt(4)').remove();
}

setInterval(function(){ update(); }, 1000);

setInterval(function(){ randomEvent(); }, 5000);

setInterval(function(){ saveGame(); }, 30000);
