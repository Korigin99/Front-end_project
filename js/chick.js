var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var score = document.getElementById("score");
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 300;

var img2 = new Image();
img2.src = "dinosaur.png";

var dino = {
  x: 100,
  y: 400,
  width: 10,
  height: 10,
  draw() {
    ctx.fillStyle = "green";
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y);
  },
};
var img1 = new Image();
img1.src = "cactus.png";

class Cactus {
  constructor() {
    this.x = 1500;
    this.y = 400;
    this.width = 10;
    this.height = 10;
  }
  draw() {
    ctx.fillStyle = "red";
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y);
  }
}

var timer = 0;
var cactuss = [];
var jump_timer = 0;
var animation;

function ani() {
  animation = requestAnimationFrame(ani);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 100 === 0) {
    var cactus = new Cactus();
    cactuss.push(cactus);
  }
  if (timer % 450 === 0) {
    var cactus = new Cactus();
    cactuss.push(cactus);
  }

  cactuss.forEach((a, i, o) => {
    //x좌표가 0미만 제거
    if (a.x < 0) {
      o.splice(i, 1);
    }
    a.x -= 5;
    attack(dino, a);
    a.draw();
  });

  if (jump == true) {
    dino.y -= 8;
    jump_timer += 3;
  }

  if (jump == false) {
    if (dino.y < 400) {
      dino.y += 8;
    }
  }

  if (jump_timer > 100) {
    jump = false;
    jump_timer = 0;
  }
  if (dino.y == 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // cancelAnimationFrame(animation);
    gameover();
  }
  dino.draw();
}
ani();
//충돌확인
function attack(dino, cactus) {
  var dx = cactus.x - (dino.x + dino.width);
  var dy = cactus.y - (dino.y + dino.height);
  if (dx < 0 && dy < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
    gameover();
  }
}
var jump = false;
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jump = true;
  }
});

// 게임오버 처리
function gameover() {
  alert("Game Over!\n다시 도전 하시겠습니까?");
  setTimeout(function () {
    location.reload();
  }, 0);
}
