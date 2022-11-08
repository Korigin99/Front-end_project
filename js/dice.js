var m_out = document.getElementById("ment_wrap");
var u_t = document.getElementById("user_title");
var c_t = document.getElementById("com_title");
var u_out1 = document.getElementById("user_img1");
var u_out2 = document.getElementById("user_img2");
var u_out3 = document.getElementById("user_img3");
var c_out1 = document.getElementById("com_img1");
var c_out2 = document.getElementById("com_img2");
var c_out3 = document.getElementById("com_img3");
var u_out = [u_out1, u_out2, u_out3];
var c_out = [c_out1, c_out2, c_out3];
var dice_img = [
  "../image/dice1.png",
  "../image/dice2.png",
  "../image/dice3.png",
  "../image/dice4.png",
  "../image/dice5.png",
  "../image/dice6.png",
];
var result = "";
var try_bt = document.getElementById("retry");
var flag;
var flag2 = 1;
function showImage() {
  if (flag2 == 1) {
    var u_imgNum = [
      Math.round(Math.random() * 5),
      Math.round(Math.random() * 5),
      Math.round(Math.random() * 5),
    ];
    var c_imgNum = [
      Math.round(Math.random() * 5),
      Math.round(Math.random() * 5),
      Math.round(Math.random() * 5),
    ];
    for (var i = 0; i < 3; i++) {
      c_out[i].src = dice_img[c_imgNum[i]];
      u_out[i].src = dice_img[u_imgNum[i]];
    }
    flag = setTimeout(showImage, 500);
  }
}
function doClick() {
  if (flag2 == 1) {
    clearTimeout(flag);
    var com_dice1 = Math.floor(Math.random() * 6) + 1;
    var com_dice2 = Math.floor(Math.random() * 6) + 1;
    var com_dice3 = Math.floor(Math.random() * 6) + 1;
    var com_dice = [com_dice1, com_dice2, com_dice3];
    var com_sum = com_dice1 + com_dice2 + com_dice3;

    var user_dice1 = Math.floor(Math.random() * 6) + 1;
    var user_dice2 = Math.floor(Math.random() * 6) + 1;
    var user_dice3 = Math.floor(Math.random() * 6) + 1;
    var user_dice = [user_dice1, user_dice2, user_dice3];
    var user_sum = user_dice1 + user_dice2 + user_dice3;

    // 컴퓨터 나온 주사위 값에 맞게 이미지 삽입
    for (var j = 0; j < com_dice.length; j++) {
      for (var i = 1; i <= 6; i++) {
        if (com_dice[j] == i) {
          c_out[j].src = dice_img[i - 1];
        }
      }
    }
    // 유저 값 삽입
    for (var j = 0; j < user_dice.length; j++) {
      for (var i = 1; i <= 6; i++) {
        if (user_dice[j] == i) {
          u_out[j].src = dice_img[i - 1];
        }
      }
    }
    /*테스트*/
    /* user_dice1 = 6;
        user_dice2 = 6;
        user_dice3 = 6;
        user_sum = user_dice1 + user_dice2 + user_dice3;

        com_dice1 = 3;
        com_dice2 = 3;
        com_dice3 = 3;
        com_sum = com_dice1 + com_dice2 + com_dice3; */
    var c_result = "";

    if (
      user_dice1 == user_dice2 &&
      user_dice2 == user_dice3 &&
      com_dice1 == com_dice2 &&
      com_dice2 == com_dice3
    ) {
      if (user_sum == 3 || user_dice1 == 3) {
        if (user_sum == com_sum) {
          result = "DRAW";
          c_result = "DRAW";
        } else if (com_sum == 3) {
          result = "DEFEAT";
          c_result = "WIN";
        } else {
          result = "WIN";
          c_result = "DEFEAT";
        }
      }
      if (com_sum == 3 || com_dice1 == 3) {
        if (com_sum == user_sum) {
          result = "DRAW";
          c_result = "DRAW";
        } else if (user_sum == 3) {
          result = "WIN";
          c_result = "DEFEAT";
        } else {
          result = "DEFEAT";
          c_result = "WIN";
        }
      }
    } else {
      if (user_sum > com_sum) {
        result = "WIN";
        c_result = "DEFEAT";
      } else if (user_sum == com_sum) {
        result = "DRAW";
        c_result = "DRAW";
      } else {
        result = "DEFEAT";
        c_result = "WIN";
      }
    }
    flag2 = 0;
    u_t.innerHTML = "USER : " + result;
    c_t.innerHTML = "COM : " + c_result;
    m_out.innerHTML =
      "게임 결과 : " +
      result +
      "<br>" +
      "USER : " +
      user_dice1 +
      " + " +
      user_dice2 +
      " + " +
      user_dice3 +
      " = " +
      user_sum +
      "&nbsp&nbsp&nbsp&nbsp" +
      "COM : " +
      com_dice1 +
      " + " +
      com_dice2 +
      " + " +
      com_dice3 +
      " = " +
      com_sum;
  } else {
    alert("시작버튼을 눌러주세요!");
    try_bt.style.background = "red";
    try_bt.focus();
    return false;
  }
}

function reTry() {
  if (flag2 == 0) {
    try_bt.style.background = "#6040ec";
    clearTimeout(flag);
    flag2 = 1;
    flag = setTimeout(showImage, 50);
    u_t.innerHTML = "USER";
    c_t.innerHTML = "COM";
    result = "승자는???";
    m_out.innerHTML = result;
  } else {
    alert("한번만 눌러주세요!");
    return false;
  }
}
