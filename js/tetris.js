var asdf = 1;
var H = 26,
  W = 22; // field size
var shapeArray = [
  [
    [2, 2],
    [1, 2],
    [1, 1],
    [0, 1],
  ],
  [
    [1, 1],
    [1, 0],
    [0, 2],
    [0, 1],
  ],
  [
    [2, 1],
    [1, 1],
    [1, 2],
    [0, 2],
  ],
  [
    [1, 2],
    [1, 1],
    [0, 1],
    [0, 0],
  ],
  [
    [1, 2],
    [1, 1],
    [0, 2],
    [0, 1],
  ],
  [
    [2, 0],
    [1, 1],
    [1, 0],
    [0, 0],
  ],
  [
    [1, 1],
    [0, 2],
    [0, 1],
    [0, 0],
  ],
  [
    [2, 2],
    [1, 2],
    [1, 1],
    [0, 2],
  ],
  [
    [1, 2],
    [1, 1],
    [1, 0],
    [0, 1],
  ],
  [
    [3, 1],
    [2, 1],
    [1, 1],
    [0, 1],
  ],
  [
    [1, 3],
    [1, 2],
    [1, 1],
    [1, 0],
  ],
  [
    [2, 2],
    [2, 1],
    [1, 1],
    [0, 1],
  ],
  [
    [1, 0],
    [0, 2],
    [0, 1],
    [0, 0],
  ],
  [
    [2, 2],
    [1, 2],
    [0, 2],
    [0, 1],
  ],
  [
    [1, 2],
    [1, 1],
    [1, 0],
    [0, 2],
  ],
  [
    [2, 2],
    [2, 1],
    [1, 2],
    [0, 2],
  ],
  [
    [2, 2],
    [2, 1],
    [2, 0],
    [1, 0],
  ],
  [
    [2, 1],
    [1, 1],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 2],
    [0, 2],
    [0, 1],
    [0, 0],
  ],
];
var shapeRotateMap = [
  1, 0, 3, 2, 4, 6, 7, 8, 5, 10, 9, 12, 13, 14, 11, 16, 17, 18, 15,
];
var shapeColorArray = [
  "rgb(199,82,82)",
  "rgb(233,174,43)",
  "rgb(105,155,55)",
  "rgb(53,135,145)",
  "rgb(49,95,151)",
  "rgb(102,86,167)",
];
var tileColor = "white",
  shapeColor,
  wallColor = "#2c70ee";
var shapeColorIndex, nextColorIndex;
var movingThread, movingSpeed;
var fastMode = false;
var initSpeed = 500,
  deltaSpeed = 40,
  fastSpeed = 25;
var shapeCell;
var existField;
var shapePoint;
var createPoint = [1, parseInt(W / 2) - 2];
var currentShape, nextShape;
var score,
  level,
  levelStack = 0;
var isPaused = false;
var flag = 0;

function gameStart() {
  document.getElementById("gameover").style.visibility = "hidden";
  flag = 0;
  if (flag == 0) {
    init();
  }
}

window.onload = drawField();

// 스크롤 막기
window.addEventListener(
  "keydown",
  function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

// 키 입력 처리
document.onkeydown = keyDownEventHandler;
function keyDownEventHandler(e) {
  switch (e.keyCode) {
    case 37:
      setTimeout("moveLR(-1)", 0);
      break; //좌
    case 39:
      setTimeout("moveLR(1)", 0);
      break; // 우
    case 32:
      setTimeout("rotateShape()", 0);
      break; // 스페이스바
    case 40:
      moveFast();
      break; // 하
  }
}

document.onkeyup = keyUpEventHandler;

// 키를 때면 속도 정상으로 복귀
function keyUpEventHandler(e) {
  if (e.keyCode == 40) moveSlow();
}

// 초기 설정
function init() {
  drawField();
  initExistField();
  setWall();
  nextColorIndex = -1;
  movingSpeed = initSpeed;
  shapeCell = [];
  shapePoint = [1, 1];
  score = 0;
  level = 1;
  chooseNextShape();
  chooseNextColor();
  createShape();
}

function gebi(y, x) {
  var ret = document.getElementById(String(y) + " " + String(x));
  return ret;
}

// 필드 초기화
function initExistField() {
  existField = new Array(H);
  for (var i = 0; i < H; i++) existField[i] = new Array(W);
  for (var i = 0; i < H; i++)
    for (var j = 0; j < W; j++) existField[i][j] = false;
}

// 테이블 생성
function drawField() {
  var fieldTag = '<table id="gameTable" border=0>';
  for (var i = 0; i < H; i++) {
    fieldTag += "<tr>";
    for (var j = 0; j < W; j++) {
      asdf++;
      fieldTag +=
        '<td id="' +
        String(i) +
        " " +
        String(j) +
        '"class="a' +
        String(asdf) +
        '"></td>';
    }
    fieldTag += "</tr>";
  }
  var gameDP = document.querySelector("#gameDisplay");
  gameDP.innerHTML = fieldTag;
}
function setWall() {
  for (var i = 0; i < H; i++) {
    gebi(i, 0).style.background = wallColor;
    gebi(i, W - 1).style.background = wallColor;
    existField[i][0] = true;
    existField[i][W - 1] = true;
  }
  for (var i = 0; i < W; i++) {
    gebi(0, i).style.background = wallColor;
    gebi(H - 1, i).style.background = wallColor;
    existField[0][i] = true;
    existField[H - 1][i] = true;
  }
}

// 도형 생성
function chooseNextShape() {
  nextShape = parseInt(Math.random() * shapeArray.length);
}

// 다음 도형 색 선택
function chooseNextColor() {
  if (++nextColorIndex == shapeColorArray.length) nextColorIndex = 0;
}

// 모양 만들기
function createShape() {
  shapePoint[0] = createPoint[0];
  shapePoint[1] = createPoint[1];
  currentShape = nextShape;
  currentColorIndex = nextColorIndex;
  shapeColor = shapeColorArray[currentColorIndex];
  var shape = shapeArray[currentShape];
  chooseNextShape();
  chooseNextColor();
  displayNextShape();
  for (var i = 0; i < shape.length; i++) {
    var sy = shapePoint[0] + shape[i][0];
    var sx = shapePoint[1] + shape[i][1];
    if (!isValidPoint(sy, sx)) gameOver();
    var el = gebi(parseInt(sy), parseInt(sx));
    el.style.background = shapeColor;
    shapeCell.push([sy, sx]);
  }
  
  leveling();
  movingThread = setTimeout("moveDown()", movingSpeed);
}
function displayNextShape() {
  initNextTable();
  var shape = shapeArray[nextShape];
  var color = shapeColorArray[nextColorIndex];
  for (var i = 0; i < 4; i++) {
    var y = shape[i][0];
    var x = shape[i][1];
    document.getElementById(String(y) + String(x)).style.background = color;
  }
}
function initNextTable() {
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++)
      document.getElementById(String(i) + String(j)).style.background = "white";
}

// 도형 조작
function moveDown() {
  if (flag == 0) {
    if (!canMove(1, 0)) {
      commitExist();
      checkLine();
      shapeCell = [];
      createShape();
      return;
    }
    removeShape();
    for (var i = 0; i < shapeCell.length; i++) shapeCell[i][0]++;
    shapePoint[0]++;
    showShape();
    movingThread = setTimeout("moveDown()", movingSpeed);
  }
}
function rotateShape() {
  if (flag == 0) {
    if (!canRotate()) return;
    removeShape();
    shapeCell = [];
    currentShape = shapeRotateMap[currentShape];
    var rotatedShape = shapeArray[currentShape];
    for (var i = 0; i < 4; i++) {
      var sy = shapePoint[0] + rotatedShape[i][0];
      var sx = shapePoint[1] + rotatedShape[i][1];
      shapeCell.push([sy, sx]);
    }
    showShape();
  }
}

// 모양 바꾸기
function canRotate() {
  var tempShape = shapeArray[shapeRotateMap[currentShape]];
  for (var i = 0; i < 4; i++) {
    var ty = shapePoint[0] + tempShape[i][0];
    var tx = shapePoint[1] + tempShape[i][1];
    if (!isValidPoint(ty, tx)) return false;
  }
  return true;
}
function isValidPoint(y, x) {
  return !(y <= 0 || y >= H - 1 || x <= 0 || x >= W - 1 || existField[y][x]);
}

// 모양 바꾸고 다른 타일 초기화
function removeShape() {
  for (var i = 0; i < shapeCell.length; i++) {
    var el = gebi(shapeCell[i][0], shapeCell[i][1]);
    el.style.background = tileColor;
  }
}

// 모양 보여주기
function showShape() {
  for (var i = 0; i < shapeCell.length; i++) {
    var el = gebi(shapeCell[i][0], shapeCell[i][1]);
    el.style.background = shapeColor;
  }
}

// 움직이기 좌우
function canMove(dy, dx) {
  if (flag == 0) {
    for (var i = 0; i < shapeCell.length; i++) {
      var ny = shapeCell[i][0] + dy;
      var nx = shapeCell[i][1] + dx;
      if (!isValidPoint(ny, nx)) return false;
    }
    return true;
  } else {
    alert("다시 하려면 게임하기 버튼을 누르세요!");
  }
}
function moveLR(delta) {
  if (!canMove(0, delta) || isPaused) return;
  removeShape();
  for (var i = 0; i < shapeCell.length; i++) shapeCell[i][1] += delta;
  shapePoint[1] += delta;
  showShape();
}
function moveFast() {
  if (fastMode) return;
  clearTimeout(movingThread);
  movingSpeed = fastSpeed;
  movingThread = setTimeout("moveDown()", movingSpeed);
  fastMode = true;
}
function moveSlow() {
  if (!fastMode) return;
  clearTimeout(movingThread);
  movingSpeed = initSpeed - level * deltaSpeed;
  movingThread = setTimeout("moveDown()", movingSpeed);
  fastMode = false;
}

// 점수 판정
function commitExist() {
  for (var i = 0; i < shapeCell.length; i++) {
    var y = shapeCell[i][0];
    var x = shapeCell[i][1];
    existField[y][x] = true;
  }
}
// 라인 체크
function checkLine() {
  var plusScore = level * 100;
  var finalScore = 0;
  for (var i = H - 2; i > 1; i--) {
    if (isFull(i)) {
      removeLine(i);
      i++;
      finalScore += updateScore(plusScore);
    }
  }
}

function isFull(lineIndex) {
  for (var i = 1; i < W - 1; i++) if (!existField[lineIndex][i]) return false;
  return true;
}
// 점수 난 후 라인 제거
function removeLine(lineIndex) {
  for (var i = lineIndex - 1; i >= 1; i--) {
    for (var j = 1; j < W - 1; j++) {
      
      gebi(i + 1, j).style.background = gebi(i, j).style.background;
      existField[i + 1][j] = existField[i][j];
    }
  }
}
function leveling() {
  if (level == 10) return;
  if (levelStack == level * 10) {
    level++;
    levelStack = 0;
    if (!fastMode) movingSpeed = initSpeed - level * deltaSpeed;
  }
  document.getElementById("level").innerHTML = level;
}
function updateScore(plusScore) {
  levelStack += 5;
  var comboScore = plusScore;
  score += comboScore;
  document.getElementById("score").innerHTML = score;
  return comboScore;
}

// 종료 및 일시정지
function gameOver() {
  flag = 1;
  clearTimeout(movingThread);
  initExistField();
  document.getElementById("gameover").style.visibility = "visible";
}
