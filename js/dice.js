function result() {
  // 기본값 주기
  var res = document.getElementById("final");
  var a = Math.floor(Math.random() * 6) + 1;
  var b = Math.floor(Math.random() * 6) + 1;
  var c = Math.floor(Math.random() * 6) + 1;
  var d = Math.floor(Math.random() * 6) + 1;
  var e = Math.floor(Math.random() * 6) + 1;
  var f = Math.floor(Math.random() * 6) + 1;

  //주사위에 표시
  for (var i = 1; i <= 6; i++) {
    if (a == i) {
      var img = document.getElementById("img1");
      img.src = +"../image/" + i + ".jpg";
    }
    if (b == i) {
      var img = document.getElementById("img2");
      img.src = "../image/" + i + ".jpg";
    }
    if (c == i) {
      var img = document.getElementById("img3");
      img.src = "../image/" + i + ".jpg";
    }
  }
  for (var i = 1; i <= 6; i++) {
    if (d == i) {
      var img = document.getElementById("img4");
      img.src = +"../image/" + i + ".jpg";
    }
    if (e == i) {
      var img = document.getElementById("img5");
      img.src = "../image/" + i + ".jpg";
    }
    if (f == i) {
      var img = document.getElementById("img6");
      img.src = "../image/" + i + ".jpg";
    }
  }
  // 랜덤값 더하기 만들기
  var user = a + b + c;
  var com = d + e + f;
  var result = 0;

  // 예외사항 넣기
  if (user == 3) user = 20;
  else if (com == 3) com = 20;
  else if (a == 3 && b == 3 && c == 3) user = 19;
  else if (d == 3 && e == 3 && f == 3) com = 19;

  // 결과표출하기
  com == user
    ? (result = "비겼습니다!")
    : com > user
    ? (result = "컴퓨터가 이겼습니다!")
    : (result = "내가 이겼습니다!");
  res.innerHTML = "<h2>" + result + "</h2>";
}
