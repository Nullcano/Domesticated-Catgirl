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

var simdata = {
  money : 0,
  xp : 0,
  cooldown : 5
}

$(document).ready(function() {
  loadGame();

  $('#home').off().on('click',function() {
    simdata.xp += 1;
    $('.home').addClass('db').removeClass('dn');
    $('.store').addClass('dn').removeClass('db');
    $('.gifts').addClass('dn').removeClass('db');
  });

  $('#work').off().on('click',function(){
    simdata.xp += 1;
    simdata.money += .5*simdata.xp;
    eventLog('You earned $' + .5*simdata.xp + '');
    var btn = $(this);
    btn.prop('disabled', true);
    setTimeout(function(){
      btn.prop('disabled', false);
    }, simdata.cooldown*1000);
  });

  $('#store').off().on('click',function() {
    simdata.xp += 1;
    $('.home').addClass('dn').removeClass('db');
    $('.store').addClass('db').removeClass('dn');
    $('.gifts').addClass('dn').removeClass('db');
  });

  $('#gifts').off().on('click',function() {
    simdata.xp += 1;
    $('.home').addClass('dn').removeClass('db');
    $('.store').addClass('dn').removeClass('db');
    $('.gifts').addClass('db').removeClass('dn');
  });

  $('#buybed').off().on('click',function() {
    var btn = $(this);
    simdata.money -= 50;
    btn.prop('disabled', true);
    $('#home').append('<div class="bed"></div>');
  });

});

function update() {
  simdata.money;
  updateDisp();
}
function updateDisp(){
  $('#money').text(simdata.money);
  $('#xp').text(simdata.xp);
}
setInterval(function(){ update(); }, 1000);

function saveGame(){
  Cookies.set("simdata",simdata);
  eventLog('Progress saved!');
}
setInterval(function(){ saveGame(); }, 60000);

function loadGame(){
  var simcookie = Cookies.getJSON("simdata");
  if(simcookie){
    simdata = simcookie;
  }
}

function eventLog(text){
  $('#eventLog').prepend("<li>" + text + "</li>");
  $('#eventLog li:gt(4)').remove();
}
