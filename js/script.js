function load() {
    clock();
    Img();
    time();
}

function clock(){
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('clock').innerHTML =
        h + ":" + m;
    var t = setTimeout(Clock, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

function Img(){
    var today = new Date();
    var h = today.getHours();
    console.log(h);

    if(h>=6 && h<=11){
        //change the images ONLY IF YOU KNOW WHAT YOUR DOING   "url('www.yourimage.jpg')" OR change the images in the map and rename.
        document.getElementById('img').style.backgroundImage = "url('img/morning2.jpg')";
        // Change position ONLY IF YOU KNOW WHAY YOU ARE DOING     "-123px"
        document.getElementById('img').style.backgroundPositionY = "-210px";
        // YOU CAN CHANGE YOUR NAME HERE               "Good morning Yourname!"
        document.getElementById('welcome').innerHTML = "Good morning Sempai!";
    }
    if(h>=12 && h<=16) {
        document.getElementById('img').style.backgroundImage = "url('img/day1.jpg')";
        document.getElementById('img').style.backgroundPositionY = "-250px";
        // ALSO CHANGE YOUR NAME HERE                  "Good morning Yourname!"
        document.getElementById('welcome').innerHTML = "Good day Sempai!";
    }
    if(h>=17 && h<=19) {
        document.getElementById('img').style.backgroundImage = "url('img/noon1.jpg')";
        document.getElementById('img').style.backgroundPositionY = "-150px";
        // ALSO CHANGE YOUR NAME HERE                  "Good morning Yourname!"
        document.getElementById('welcome').innerHTML = "Good afternoon Sempai!";
    }
    if((h>=20 && h<=23) || (h>=0 && h<=5)){
        document.getElementById('img').style.backgroundImage = "url('img/night1.jpg')";
        document.getElementById('img').style.backgroundPositionY = "-240px";
        // ALSO CHANGE YOUR NAME HERE                  "Good morning Yourname!"
        document.getElementById('welcome').innerHTML = "Good night Sempai!";
    }
}
function time(){
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

    var total = day + " | " + d + " | " + m;
    console.log(total);

    document.getElementById('currentTime').innerHTML = total;
}
