//Sounds
var achievement = new Audio('sound/achievement.wav')
var click = new Audio('sound/click.wav');
var close = new Audio('sound/close.wav');
var open = new Audio('sound/open.wav');
var nya = new Audio('sound/nya.wav');
$("#mute").click(function() {
  $(this).addClass("o-50");
  achievement.muted = true;
  click.muted = true;
  close.muted = true;
  open.muted = true;
  nya.muted = true;
});

//Content
$('.menuitem').click(function(){
  var content = $(this).attr('data-content');
  $('.menuitem').removeClass('current');
  $('.content').removeClass('current');
  $(this).addClass('current');
  $("#"+content).addClass('current');
})

//Popups
$("#door").click(function() {
  $(".megamenu").show();
  open.play();
});
$("#wardrobe").click(function() {
  $(".openwardrobe").show();
  open.play();
});
$("#achievements").click(function() {
  $(".openachievements").show();
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
$("#gotocatnipfarm").click(function() {
  $(".catnipfarm").show();
  $(".megamenu").hide();
});
$("#closemegamenu").click(function() {
  $(".megamenu").hide();
  close.play();
});
$("#closewardrobe").click(function() {
  $(".openwardrobe").hide();
  close.play();
});
$("#closeachievements").click(function() {
  $(".openachievements").hide();
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
$("#exitcatnipfarm").click(function() {
  $(".catnipfarm").hide();
});
$("#startgame").click(function() {
  $(".newgame").hide();
});

//Notifications
$("#closenote").click(function() {
  $(".notify").hide();
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
    "OK...",
    "Oh...",
    "Alright...",
    "Fine...",
    "Really?"
  ];
  $("#confirm").text(confirm[Math.floor(Math.random() * confirm.length)]);
};

var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);