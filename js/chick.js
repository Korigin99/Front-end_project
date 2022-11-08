var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var score = document.getElementById("score");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
var levelup = 1240;
// canvas.width = window.innerWidth - 100;
// canvas.height = window.innerHeight - 300;
var title = new Image();
title.src = "../image/chick_title.png";
var title2 = new Image();
title2.src = "../image/chicken_title.png";
var headline = {
  x: 100,
  y: 50,
  width: 100,
  height: 100,
  draw() {
    if (count < levelup) {
      ctx.drawImage(title, headline.x, headline.y);
    } else if (count >= levelup) {
      ctx.drawImage(title2, headline.x, headline.y + 30);
    }
  },
};

var img2 = new Image();
img2.src = "../image/dinosaur.png";
var img5 = new Image();
img5.src = "../image/dinosaur2.png";
var img6 = new Image();
img6.src = "../image/chicken.png";
var img7 = new Image();
img7.src = "../image/chicken2.png";

var anicount = 0;
var dino = {
  x: 50,
  y: 480,
  width: 80,
  height: 80,
  draw() {
    ctx.fillStyle = "green";
    anicount++;
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    if (count < levelup) {
      if (anicount <= 10) ctx.drawImage(img2, dino.x, dino.y);
      else if (anicount <= 20) {
        ctx.drawImage(img5, dino.x, dino.y);
      }
      if (anicount >= 20) anicount = 0;
    } else if (count > levelup) {
      if (anicount <= 7) ctx.drawImage(img6, dino.x, dino.y);
      else if (anicount <= 14) {
        ctx.drawImage(img7, dino.x, dino.y);
      }
      if (anicount >= 14) anicount = 0;
    }
  },
};

var img3 = new Image();
img3.src = "../image/cloud.png";
class Cloud {
  constructor() {
    this.x = 1500;
    this.y = 1;
    this.width = 20;
    this.height = 20;
  }
  draw() {
    ctx.fillStyle = "blue";
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img3, this.x, this.y);
  }
}
var img4 = new Image();
img4.src = "../image/sand.png";
class Sand {
  constructor() {
    this.x = 1500;
    this.y = 1;
    this.width = 20;
    this.height = 20;
  }
  draw() {
    ctx.fillStyle = "blue";
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img4, this.x, this.y);
  }
}

var img1 = new Image();
img1.src = "../image/cactus.png";

class Cactus {
  constructor() {
    this.x = 1500;
    this.y = 500;
    this.width = 20;
    this.height = 20;
  }
  draw() {
    ctx.fillStyle = "red";
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y);
  }
}

var score = document.getElementById("score");
var out = "SCORE : ";
var timer = 0;
var cactuss = [];
var clouds = [];
var sands = [];
var jump_timer = 0;
var animation;
var jump_count = 2;
let count = 0;
function ani() {
  animation = requestAnimationFrame(ani);
  timer++;
  count++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (count > levelup) {
    timer += 10;
    if (timer % 160 === 0) {
      var cactus = new Cactus();
      cactuss.push(cactus);
    }

    if (timer % 60 === 0) {
      var sand = new Sand();
      sands.push(sand);
    }
    if (timer % 120 === 0) {
      var cloud = new Cloud();
      clouds.push(cloud);
    }
    if (timer % 390 === 0) {
      var cactus = new Cactus();
      cactuss.push(cactus);
    }
    if (timer % 540 === 0) {
      var cactus = new Cactus();
      cactuss.push(cactus);
    }
  } else {
    if (timer % 200 === 0) {
      var cactus = new Cactus();
      cactuss.push(cactus);
    }

    if (timer % 100 === 0) {
      var sand = new Sand();
      sands.push(sand);
    }
    if (timer % 200 === 0) {
      var cloud = new Cloud();
      clouds.push(cloud);
    }
    if (timer % 450 === 0) {
      var cactus = new Cactus();
      cactuss.push(cactus);
    }
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
  clouds.forEach((a, i, o) => {
    a.x -= 5;
    a.draw();
  });
  sands.forEach((a, i, o) => {
    a.x -= 5;
    a.draw();
  });

  if (jump == true) {
    dino.y -= 7;
    jump_timer += 3;
  }

  if (jump == false) {
    if (dino.y < 480) {
      dino.y += 5;
    }
  }

  if (jump_timer > 100) {
    jump = false;
    jump_timer = 0;
  }
  //천장에 닿으면 죽음
  if (dino.y == 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
    gameover();
  }
  headline.draw();
  dino.draw();
  if (count > 240) {
    score.innerHTML = out + parseInt(count / 10 - 24);
  } else score.innerHTML = out + 0;
  if (dino.y >= 480) jump_count = 2;
  scoreColor = parseInt(count / 10 - 24);
  if (scoreColor > 0 && scoreColor % 100 == 0 && !IsEffect) {
    IsEffect = true;
    console.log("진입");
    effect();
  }
}
var scoreColor;
var scoreCnt = 0;
var a;
var IsEffect = false;
function effect() {
  a = setInterval(toggle, 200);
}
function toggle() {
  $("#score").toggle();
  scoreCnt++;

  if (scoreCnt == 6) {
    scoreCnt = 0;
    IsEffect = false;
    clearInterval(a);
  }
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
    if (jump_count > 0) {
      jump = true;
      jump_count--;
    }
  }
});

// 게임오버 처리
function gameover() {
  alert("Game Over!\n다시 도전 하시겠습니까?");
  setTimeout(function () {
    location.reload();
  }, 0);
}
