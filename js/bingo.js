var res = document.getElementById("display_wrap");
var userDiv = [];
var userNum = [];
var comNum = [];

var flag = 1;
var comFlag = 5;
var uNum;
var udiv;
var uDiv;
var rowS = 0;
var colS = 0;
let row = 5;
let column = 5;
let userCheck = Array.from(Array(row), () => Array(column).fill(0));
let comCheck = Array.from(Array(row), () => Array(column).fill(0));
var rowCheck = 0;
var colCheck = 0;
var ux = 0;
var uy = 0;
var cx = 0;
var cy = 0;
var userWin = "userWin";
var comWin = "comWin";
var breakNum = 0;
var temp = 0;
var temp2 = 1;
var colJ = 0;
var colI = 0;
var colTemp = 0;
var colTemp2 = 1;
var gameEnd = 0;
var crossCheck = 0;
var crossCheck2 = 0;
var alcheck = 0;
var comDiv2 = new Array(5);
for (var i = 0; i < comDiv2.length; i++) {
  comDiv2[i] = new Array(5);
}

for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 5; j++) {
    userCheck[i][j] = false;
    comCheck[i][j] = false;
  }
}

// 유저와 컴퓨터에 빙고 값 삽입 중복제거, 데이터 넘김;
function userSave() {
  if (flag == 2) {
    restart();
  }
  randomN();
  fisrtTurn();
  breakNum = 0;
  if (comFlag == 1) {
    setTimeout(comTurn, 700);
  }
}
// 유저가 빙고 클릭시 일어나는 이벤트
function bingoClick(uName) {
  if (flag == 1) {
    alert("저장을 먼저 해주세요!");
    return false;
  }
  if (flag == 2) {
    alert("게임이 종료되었습니다! 시작버튼을 다시 눌러주세요!");
    return false;
  }
  if (comFlag == 0) {
    comFlag = 1;
    uNum = uName.value;
    udiv = uName.id;
    uDiv = document.getElementById(udiv);
    if (uDiv.style.background == "#2c70ee") {
      alert("이미 선택한 칸입니다!");
      comFlag = 0;
      return;
    }
    uDiv.style.background = "#2c70ee";
    uDiv.style.color = "white";
    for (var i = 0; i < 25; i++) {
      if (uNum == userDiv[i].value) {
        ux = parseInt(i / 5);
        uy = i % 5;
        userCheck[ux][uy] = true;
        break;
      }
    }
    for (var i = 0; i < comDiv2.length; i++) {
      for (var j = 0; j < comDiv2.length; j++) {
        if (uNum == comDiv2[i][j].value) {
          comDiv2[i][j].style.background = "#2c70ee";
          comDiv2[i][j].style.color = "white";
          // console.log(cx + " " + cy);
          comCheck[i][j] = true;
          console.log(comCheck);
          breakNum = 1;
          break;
        }
      }
    }

    res.innerHTML = "빙파고 차례";
    bingoCheck(comCheck, comWin);
    bingoCheck(userCheck, userWin);
    setTimeout(comTurn, 700);
  } else {
    alert("컴퓨터 차례입니다. 기다려라!");
  }
}

// 컴퓨터 AI
function comTurn() {
  if (gameEnd == 0) {
    if (comFlag == 1) {
      console.log("어디가 겹칠까요~");
      var comRan1 = Math.floor(Math.random() * 4);
      var comRan2 = Math.floor(Math.random() * 4);
      // if(alcheck < 2){
      // 대각선 왼쪽 위에서 오른쪽 아래
      for (var i = 0; i < 5; i++) {
        if (comCheck[i][i] == true) {
          for (var j = 0; j < 5; j++) {
            if (i != j && comCheck[j][j] == true) {
              if (comCheck[i][i] == comCheck[j][j]) {
                ++crossCheck;
                console.log("대각선" + crossCheck);
              }
            }
          }
          break;
        }
      }
      // 대각선 왼쪽 아래에서 오른 쪽 위
      /* for (var i = 4; i >= 0; i--) {
                for (var j = 0; j < 5; j++) {
                    if (comCheck[i][j] == true) {
                        for (var l = 4; l >= 0; l--) {
                            for (var c = 0; c < 5; c++) {
                                if (i != l && j != c && comCheck[l][c] == true) {
                                    ++crossCheck2;
                                    console.log("왼오대각선" + crossCheck2);
                                }
                            }
                        }
                        break;
                    }
                }
            } */
      // 가로체크
      for (var uc = 0; uc < 5; uc++) {
        for (var ur = 0; ur < 5; ur++) {
          if (comCheck[uc][ur] == true) {
            for (var i = 0; i < 5; i++) {
              if (comCheck[uc][i] == true) {
                ++rowCheck; //가로
                console.log("가로" + rowCheck);
              }
            }
            break;
          }
        }
      }
      // 세로체크
      for (var uc = 0; uc < 5; uc++) {
        for (var ur = 0; ur < 5; ur++) {
          if (comCheck[uc][ur] === true) {
            for (var i = 0; i < 5; i++) {
              if (comCheck[i][ur] == true) {
                ++colCheck;
                console.log("세로" + colCheck);
              }
            }
            break;
          }
        }
      }
      // }
      if (breakNum == 0) {
        breakNum = 1;
        // 아무것도 겹치지 않았을
        console.log("breakNum이 0일때");
        for (var x = 0; x < comDiv2.length; x++) {
          for (var y = 0; y < comDiv2.length; x++) {
            comDiv2[comRan1][comRan2].style.background = "#2c70ee";
            comDiv2[comRan1][comRan2].style.color = "white";
            comCheck[comRan1][comRan2] = true;
            for (var k = 0; k < 25; k++) {
              // 컴퓨터 이벤트시 유저 값과 겹치면
              if (comDiv2[comRan1][comRan2].value == userDiv[k].value) {
                userDiv[k].style.background = "#2c70ee";
                userDiv[k].style.color = "white";
                console.log("처음에 안 겹쳤을 때!");
                ux = parseInt(k / 5);
                uy = k % 5;
                userCheck[ux][uy] = true;
                comFlag = 0;
                res.innerHTML = "유저 차례";
                bingoCheck(comCheck, comWin);
                bingoCheck(userCheck, userWin);
                return;
              }
            }
            comFlag = 0;
            res.innerHTML = "유저 차례";
            bingoCheck(comCheck, comWin);
            bingoCheck(userCheck, userWin);
            return;
          }
        }
      }
      if (rowCheck == colCheck) {
        console.log("가로세로 같음");
        var ran = Math.floor(Math.random() * 2) + 1;
        if (ran == 1) {
          rowS = 1;
        } else {
          colS = 2;
        }
      }
      // 대각선
      if (crossCheck > rowCheck && crossCheck > colCheck) {
        alcheck++;
        for (var i = 0; i < 5; i++) {
          if (comCheck[i][i] == true) {
            for (var j = 0; j < 5; j++) {
              // if (i != j) {
              if (comCheck[j][j] != true) {
                comCheck[j][j] = true;
                comDiv2[j][j].style.background = "#2c70ee";
                comDiv2[j][j].style.color = "white";
                comFlag = 0;
                res.innerHTML = "유저 차례";
                for (var k = 0; k < 25; k++) {
                  if (userDiv[k].value == comDiv2[j][j].value) {
                    userDiv[k].style.background = "#2c70ee";
                    userDiv[k].style.color = "white";
                  }
                }
                bingoCheck(comCheck, comWin);
                bingoCheck(userCheck, userWin);
                return;
              }
            }
          }
        }
      }
      // 가로
      if (rowCheck > colCheck || rowS == 1) {
        alcheck++;
        rowS = 0;
        if (temp2 == temp) {
          console.log("가로옴");
          for (var rowRan = 0; rowRan < 5; rowRan++) {
            for (var colRan = 0; colRan < 5; colRan++) {
              if (
                rowRan == temp2 &&
                colJ != colRan &&
                comCheck[rowRan][colRan] != true
              ) {
                comDiv2[temp2][colRan].style.background = "#2c70ee";
                comDiv2[temp2][colRan].style.color = "white";
                comCheck[temp2][colRan] = true;
                console.log("hi");
                console.log(comCheck);
                for (var k = 0; k < 25; k++) {
                  if (comDiv2[temp2][colRan].value == userDiv[k].value) {
                    userDiv[k].style.background = "#2c70ee";
                    userDiv[k].style.color = "white";
                    console.log("k값:" + k);
                    ux = parseInt(k / 5);
                    uy = k % 5;
                    userCheck[ux][uy] = true;
                    console.log("가로 컴퓨터 랜덤 들림");
                    comFlag = 0;
                    res.innerHTML = "유저 차례";
                    bingoCheck(comCheck, comWin);
                    bingoCheck(userCheck, userWin);
                    return;
                  }
                }
                comFlag = 0;
                res.innerHTML = "유저 차례";
                bingoCheck(comCheck, comWin);
                bingoCheck(userCheck, userWin);
                return;
              }
            }
          }
        }
        if (breakNum == 1) {
          console.log("가로옴");
          if (temp2 != temp) {
            for (var i = 0; i < 5; i++) {
              for (var j = 0; j < 5; j++) {
                if (comCheck[i][j] == true) {
                  breakNum = 3;
                  temp = i;
                  temp2 = temp;
                  colJ = j;
                  console.log("여기도 들리니?");
                  for (var rowRan = 0; rowRan < 5; rowRan++) {
                    for (var colRan = 0; colRan < 5; colRan++) {
                      // 가로
                      if (
                        rowRan == temp &&
                        j != colRan &&
                        comCheck[rowRan][colRan] != true
                      ) {
                        comDiv2[rowRan][colRan].style.background = "#2c70ee";
                        comDiv2[rowRan][colRan].style.color = "white";
                        comCheck[rowRan][colRan] = true;
                        for (var k = 0; k < 25; k++) {
                          if (
                            comDiv2[rowRan][colRan].value == userDiv[k].value
                          ) {
                            userDiv[k].style.background = "#2c70ee";
                            userDiv[k].style.color = "white";
                            console.log("k값:" + k);
                            ux = parseInt(k / 5);
                            uy = k % 5;
                            userCheck[ux][uy] = true;
                            console.log("가로 컴퓨터 랜덤 들림2");
                            k = 25;
                            comFlag = 0;
                            res.innerHTML = "유저 차례";
                            bingoCheck(comCheck, comWin);
                            bingoCheck(userCheck, userWin);
                            return;
                          }
                        }
                        break;
                      }
                    }
                  }
                  comFlag = 0;
                  res.innerHTML = "유저 차례";
                  bingoCheck(comCheck, comWin);
                  bingoCheck(userCheck, userWin);
                  return;
                }
              }
            }
          }
        }
      }
      // 가로 끝

      // 세로 시작
      if (colCheck > rowCheck || colS == 2) {
        alcheck++;
        colS = 0;
        if (colTemp2 == colTemp) {
          console.log("세로옴");
          for (var rowRan = 0; rowRan < 5; rowRan++) {
            for (var colRan = 0; colRan < 5; colRan++) {
              if (
                rowRan != i &&
                colTemp == colRan &&
                comCheck[rowRan][colRan] != true
              ) {
                comDiv2[rowRan][colTemp2].style.background = "#2c70ee";
                comDiv2[rowRan][colTemp2].style.color = "white";
                comCheck[rowRan][colTemp2] = true;
                console.log("hi");
                console.log(comCheck);
                for (var k = 0; k < 25; k++) {
                  if (comDiv2[rowRan][colTemp2].value == userDiv[k].value) {
                    userDiv[k].style.background = "#2c70ee";
                    userDiv[k].style.color = "white";
                    console.log("k값:" + k);
                    ux = parseInt(k / 5);
                    uy = k % 5;
                    userCheck[ux][uy] = true;
                    console.log("세로 컴퓨터 랜덤 들림");
                    comFlag = 0;
                    bingoCheck(comCheck, comWin);
                    bingoCheck(userCheck, userWin);
                    return;
                  }
                }
                comFlag = 0;
                res.innerHTML = "유저 차례";
                bingoCheck(comCheck, comWin);
                bingoCheck(userCheck, userWin);
                return;
              }
            }
          }
        }
        if (breakNum == 1) {
          console.log("세로옴");
          if (colTemp2 != colTemp) {
            for (var i = 0; i < 5; i++) {
              for (var j = 0; j < 5; j++) {
                if (comCheck[i][j] == true) {
                  breakNum = 3;
                  colTemp = j;
                  colTemp2 = colTemp;
                  colI = i;
                  console.log("여기도 들리니?");
                  for (var rowRan = 0; rowRan < 5; rowRan++) {
                    for (var colRan = 0; colRan < 5; colRan++) {
                      // 세로
                      if (
                        rowRan != i &&
                        colTemp == colRan &&
                        comCheck[rowRan][colRan] != true
                      ) {
                        comDiv2[rowRan][colRan].style.background = "#2c70ee";
                        comDiv2[rowRan][colRan].style.color = "white";
                        comCheck[rowRan][colRan] = true;
                        for (var ak = 0; ak < 25; ak++) {
                          if (
                            comDiv2[rowRan][colRan].value == userDiv[ak].value
                          ) {
                            userDiv[ak].style.background = "#2c70ee";
                            userDiv[ak].style.color = "white";
                            console.log("k값:" + ak);
                            ux = parseInt(ak / 5);
                            uy = ak % 5;
                            userCheck[ux][uy] = true;
                            console.log("세로 컴퓨터 랜덤 들림2");
                            ak = 25;
                            comFlag = 0;
                            res.innerHTML = "유저 차례";
                            bingoCheck(comCheck, comWin);
                            bingoCheck(userCheck, userWin);
                            return;
                          }
                        }
                        comFlag = 0;
                        res.innerHTML = "유저 차례";
                        bingoCheck(comCheck, comWin);
                        bingoCheck(userCheck, userWin);
                        return;
                      }
                    }
                  }
                  comFlag = 0;
                  res.innerHTML = "유저 차례";
                  bingoCheck(comCheck, comWin);
                  bingoCheck(userCheck, userWin);
                  return;
                }
              }
            }
          }
        }
      }
      // 세로끝
      comFlag = 0;
      res.innerHTML = "유저 차례";
    }
    bingoCheck(comCheck, comWin);
    bingoCheck(userCheck, userWin);
  }
}
function bingoCheck(nameCheck, name2) {
  // 가로 범위
  if (gameEnd == 0) {
    for (var i = 0; i < 5; i++) {
      // 가로
      if (
        (nameCheck[i][0] &&
          nameCheck[i][1] &&
          nameCheck[i][2] &&
          nameCheck[i][3] &&
          nameCheck[i][4]) == true
      ) {
        if (name2 == "userWin") {
          alert("원빙고! 유저승!!! 게임 종료");
          res.innerHTML = "유저 승!!!";
          flag = 2;
          gameEnd = 1;
          break;
        }
        if (name2 == "comWin") {
          alert("원빙고! 컴퓨터승!!! 게임 종료");
          res.innerHTML = "빙파고 승!!!";
          flag = 2;
          gameEnd = 1;
          break;
        }
      }
      // 세로
      if (
        (nameCheck[0][i] &&
          nameCheck[1][i] &&
          nameCheck[2][i] &&
          nameCheck[3][i] &&
          nameCheck[4][i]) == true
      ) {
        if (name2 == "userWin") {
          alert("원빙고! 유저승!!! 게임 종료");
          res.innerHTML = "유저 승!!!";
          flag = 2;
          gameEnd = 1;
          break;
        }
        if (name2 == "comWin") {
          alert("원빙고! 컴퓨터승!!! 게임 종료");
          res.innerHTML = "빙파고 승!!!";
          flag = 2;
          gameEnd = 1;
          break;
        }
      }
      // 대각선 위에서 아래
      if (
        (nameCheck[0][0] &&
          nameCheck[1][1] &&
          nameCheck[2][2] &&
          nameCheck[3][3] &&
          nameCheck[4][4]) == true
      ) {
        if (name2 == "userWin") {
          alert("원빙고! 유저승!!! 게임 종료");
          res.innerHTML = "유저 승!!!";
          flag = 2;
          gameEnd = 1;
          break;
        }
        if (name2 == "comWin") {
          alert("원빙고! 컴퓨터승!!! 게임 종료");
          res.innerHTML = "빙파고 승!!!";
          flag = 2;
          gameEnd = 1;
          break;
        }
      }
      // 대각선 아래에서 위
      if (
        (nameCheck[0][4] &&
          nameCheck[1][3] &&
          nameCheck[2][2] &&
          nameCheck[3][1] &&
          nameCheck[4][0]) == true
      ) {
        if (name2 == "userWin") {
          alert("원빙고! 유저승!!! 게임 종료");
          flag = 2;
          gameEnd = 1;
          break;
        }
        if (name2 == "comWin") {
          alert("원빙고! 컴퓨터승!!! 게임 종료");
          flag = 2;
          gameEnd = 1;
          break;
        }
      }
    }
  }
}
// 초기화
function restart() {
  flag = 1;
  alert("게임을 다시 시작합니다.");
  setTimeout(function () {
    location.reload();
  }, 0);
}

function randomN() {
  if (flag == 1) {
    while (comNum.length < 25) {
      var n = parseInt(Math.random() * 100) + 1;
      if (comNum.indexOf(n) < 0) {
        comNum.push(n);
      }
    }
    while (userNum.length < 25) {
      var n = parseInt(Math.random() * 100) + 1;
      if (userNum.indexOf(n) < 0) {
        userNum.push(n);
      }
    }

    for (var i = 0; i < 25; i++) {
      userDiv[i] = document.getElementById("userCol" + (i + 1));
    }
    var colNum = 0;
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        comDiv2[i][j] = document.getElementById("comCol" + ++colNum);
      }
    }

    for (var i = 0; i < userDiv.length; i++) {
      userDiv[i].value = userNum[i];
      userDiv[i].innerHTML = userNum[i];
    }
    var cN = 0;
    var cN2 = 0;
    for (var i = 0; i < comDiv2.length; i++) {
      for (var j = 0; j < comDiv2.length; j++) {
        comDiv2[i][j].value = comNum[cN++];
        comDiv2[i][j].innerHTML = comNum[cN2++];
        comDiv2[i][j].style.color = "black";
      }
    }
    flag = 0;
  } else {
    alert("한 번만 누르세요");
    return false;
  }
}

function fisrtTurn() {
  var asd = Math.floor(Math.random() * 2) + 1;
  if (asd == 1) {
    res.innerHTML = "유저 선공";
    comFlag = 0;
  }
  if (asd == 2) {
    res.innerHTML = "빙파고 선공";
    comFlag = 1;
  }
}
