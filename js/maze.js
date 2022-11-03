var mazeMap = new Array(10);
for (var i = 0; i < mazeMap.length; i++) {
  mazeMap[i] = new Array(10);
}

var userLoc = new Array(10);
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    userLoc[i] = new Array(10);
  }
}

mazeMap = [
  [1, 1, 1, 1, 1, 0, 1, 0, 0, 1], // line0
  [1, 0, 0, 0, 1, 0, 1, 1, 1, 1], // line1
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1], // line2
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1], // line3
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1], // line4
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0], // line5
  [1, 0, 1, 1, 1, 0, 0, 0, 1, 0], // line6
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1], // line7
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1], // line8
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1] // line9
];
userLoc = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // line0
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // line1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // line2
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // line3
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // line4
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // line5
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // line6
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // line7
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // line8
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // line9
];

var mazeDiv = new Array(10);
for (var i = 0; i < mazeDiv.length; i++) {
  mazeDiv[i] = new Array(10);
}

var lineNum = 0;
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    mazeDiv[i][j] = document.getElementById('subLine' + lineNum);
    lineNum++;
  }
}

var locX = 0;
var locY = 0;
var flag = 0;
var chance = 0;
var sec = 59;
var start = 0;
var flag = 0;

// 스크롤 막기
window.addEventListener("keydown", function (e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

// 게임 시작 버튼
window.onload = document.querySelector("#start").addEventListener("click", function () {
  for (var i = 0; i < mazeMap.length; i++) {
    for (var j = 0; j < mazeMap.length; j++) {
      mazeDiv[i][j].style.background = "white";
      mazeDiv[i][j].innerHTML = "";
    }
  }
  locX = 0;
  locY = 0;
  chance = 2;
  start = 1;
  flag = 0;
  sec = 59;
  mazeDiv[0][0].innerHTML = "🕵️‍♂️";
  mazeDiv[9][9].style.background = "#ff0000";
  mazeDiv[0][0].style.background = "#2c70ee";
  document.querySelector('.hint').innerHTML = chance + "회";
  document.addEventListener("keyup", check);
  document.addEventListener("keydown", mazeEscape);
});

function mazeEscape(e) {
  var event = e || window.event;
  var keycode = event.keyCode || e.which;
  if (keycode != 37 && keycode != 38 && keycode != 39 && keycode != 40) {
    return;
  }
  if(start != 1){
    alert("다시 시작하려면 게임시작 버튼을 눌러주세요");
    return;
  }
  if (userLoc[locX][locY] == mazeDiv[9][9]) {
    alert(" 게임 시작 버튼을 다시 눌러주세요");
    return;
  }
  switch (keycode) {
    case 37: // 좌
      if (mazeMap[locX][locY - 1] === 1) {
        mazeDiv[locX][locY].style.background = "white";
        mazeDiv[locX][locY - 1].style.background = "#2c70ee";
        userLoc[locX][locY] = 0;
        userLoc[locX][locY - 1] = 1;
        mazeDiv[locX][locY].innerHTML = "";
        mazeDiv[locX][locY - 1].innerHTML = "🕵️‍♂️"
        locY--;
        console.log("x : " + locX + "  y : " + locY);
      }
      break;
    case 38: // 상
      if (locX - 1 < 0) {
        console.log("맵 밖");
        break;
      }
      if (mazeMap[locX - 1][locY] === 1) {
        mazeDiv[locX][locY].style.background = "white";
        mazeDiv[locX - 1][locY].style.background = "#2c70ee";
        userLoc[locX][locY] = 0;
        userLoc[locX - 1][locY] = 1;
        mazeDiv[locX][locY].innerHTML = "";
        mazeDiv[locX - 1][locY].innerHTML = "🕵️‍♂️";
        locX--;
        console.log("x : " + locX + "  y : " + locY);
      }
      break;
    case 39:
      if (mazeMap[locX][locY + 1] === 1) {
        mazeDiv[locX][locY].style.background = "white";
        mazeDiv[locX][locY + 1].style.background = "#2c70ee";
        userLoc[locX][locY] = 0;
        userLoc[locX][locY + 1] = 1;
        mazeDiv[locX][locY].innerHTML = "";
        mazeDiv[locX][locY + 1].innerHTML = "🕵️‍♂️";
        locY++;
        console.log("x : " + locX + "  y : " + locY);
      }
      break;
    case 40:
      if (locX + 1 > 9) {
        console.log("맵 밖");
        break;
      }
      if (mazeMap[locX + 1][locY] == 1) {
        mazeDiv[locX][locY].style.background = "white";
        mazeDiv[locX + 1][locY].style.background = "#2c70ee";
        userLoc[locX][locY] = 0;
        userLoc[locX + 1][locY] = 1;
        mazeDiv[locX][locY].innerHTML = "";
        mazeDiv[locX + 1][locY].innerHTML = "🕵️‍♂️";
        locX++;
        console.log("x : " + locX + "  y : " + locY);
      }
      break;
  }
}

function check() {
  if (locX == 9 && locY == 9) {
    alert("탈출 성공!");
    locX = 0;
    locY = 0;
    flag = 1;
    start = 0;
    return;
  }
}

function hint() {
  if (chance > 0) {
    document.querySelector('.hint').innerHTML = --chance + "회";
    console.log("xxx");
    for (var i = 0; i < mazeMap.length; i++) {
      for (var j = 0; j < mazeMap.length; j++) {
        if (mazeMap[i][j] == 1) {
          mazeDiv[i][j].style.background = "#2c70ee";
        }
      }
    }
    setTimeout(hint2, 500);
  } else {
    alert("힌트를 다 사용했습니다~!");
    return false;
  }
  mazeDiv[9][9].style.background = "#ff0000";
}
function hint2() {
  for (var i = 0; i < mazeMap.length; i++) {
    for (var j = 0; j < mazeMap.length; j++) {
      if (mazeMap[i][j] == 1) {
        mazeDiv[i][j].style.background = "white";
        mazeDiv[locX][locY].style.background = "#2c70ee";
      }
    }
  }
  mazeDiv[9][9].style.background = "#ff0000";
}

var timeDP = document.querySelector(".timeDP");
var imgDP = document.querySelector('.imgDP');
var sec = 60;
setInterval(function () {
  if (flag == 1) {
    timeDP.innerHTML = "탈출에 걸린 시간 : " + (60 - sec) + "초";
    start = 0;
    return;
  }
  if (start == 1) {
    timeDP.innerHTML = "제한시간 " + sec + "초";
    sec--;
    if (sec < 0) {
      timeDP.innerHTML = "시간 초과";
      start = 0;
      alert("다시 하려면 게임시작 버튼을 눌러주세요!");
      return;
    }
  }
}, 1000);