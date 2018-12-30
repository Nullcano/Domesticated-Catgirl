function load() {
    greet();
    calendar();
}

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
});

function greet(){
  var today = new Date();
  var h = today.getHours();
  console.log(h);

  if(h>=6 && h<=11){
    document.getElementById('img').style.backgroundImage = "url('img/morning2.jpg')";
    document.getElementById('greeting').innerHTML = "Good morning, Master!";
  }
  if(h>=12 && h<=16) {
    document.getElementById('img').style.backgroundImage = "url('img/day1.jpg')";
    document.getElementById('greeting').innerHTML = "Good day, Master!";
  }
  if(h>=17 && h<=19) {
    document.getElementById('img').style.backgroundImage = "url('img/noon1.jpg')";
    document.getElementById('greeting').innerHTML = "Good afternoon, Master!";
  }
  if((h>=20 && h<=23) || (h>=0 && h<=5)){
    document.getElementById('img').style.backgroundImage = "url('img/night1.jpg')";
    document.getElementById('greeting').innerHTML = "Good night, Master!";
  }
}
function calendar(){
  var today = new Date();
  var weekday = new Array(7);
  weekday[0]=  "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  var day = weekday[today.getDay()];
  var d = today.getDate();
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

  var m = month[today.getUTCMonth()];
  var total = day + " " + d + " " + m;
  console.log(total);

  document.getElementById('date').innerHTML = total;
}

function update() {
  document.getElementById('currentmoney').innerHTML = money;
}
var money = 0;

function timer() {
  money = money;
  update()
}
setInterval(timer, 1000)

function work() {
  money = money + 1
  update()
}

function save() {
  localStorage.setItem("money", money);
}
function load() {
  money = localStorage.getItem("money");
  money = parseInt(money);
  update()
}
