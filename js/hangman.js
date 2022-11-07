window.onload = function () {
  var alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  // 1. 먼저 변수 설정할 것들을 정해준다. (필요한 변수가 무엇인지 생각)
  var categories;
  var chosenCaegory;
  var getHint;
  var word;
  var guess;
  var guesses = [];
  var lives;
  var counter;
  var space;

  // 요소 잡기
  var showLives = document.getElementById("mylives");
  // var showCategory = document.getElementById("categoryName");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");

  // 구조를 만들어 줘야한다.
  var buttons = function () {
    var myButtons = document.getElementById("buttons");
    var letters = document.createElement("ul");

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = "alphabet";
      list = document.createElement("li");
      list.id = "letter";
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  };

  // 카테고리 선택
  // 이사람은 카테고리를 크게 3개로 정해 놓았다.
  var selectCat = function () {
    if (chosenCaegory === categories[0]) {
      console.log("This Chosen Category is 첫번째 카테고리");
    } else if (chosenCaegory === categories[1]) {
      console.log("This Chosen Category is 두번째 카테고리");
    } else if (chosenCaegory === categories[2]) {
      console.log("This Chosen Category is 세번째 카테고리");
    }
  };
  // 단어 빈칸 만들기 (구조를 그려준다.)
  result = function () {
    wordHolder = document.getElementById("hold");
    correct = document.createElement("ul");
    correct.setAttribute("id", "my-word");
    for (var i = 0; i < word.length; i++) {
      guess = document.createElement("li");
      guess.setAttribute("class", "guess");
      if (word[i] == "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }
      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  };

  // 화면에 차례대로 보일 수 있게 생명 (기회) 그려주기
  comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "you win!";
      }
    }
  };

  // 행맨 그려주기
  var animate = function () {
    var drawMe = lives;
    drawArray[drawMe]();
  };

  canvas = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

  head = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  };

  frame1 = function () {
    draw(0, 150, 150, 150);
  };

  frame2 = function () {
    draw(10, 0, 10, 600);
  };

  frame3 = function () {
    draw(0, 5, 70, 5);
  };

  frame4 = function () {
    draw(60, 5, 60, 15);
  };

  torso = function () {
    draw(60, 36, 60, 70);
  };

  rightArm = function () {
    draw(60, 46, 100, 50);
  };

  lefttArm = function () {
    draw(60, 46, 20, 50);
  };

  rightLeg = function () {
    draw(60, 70, 100, 100);
  };

  leftLeg = function () {
    draw(60, 70, 20, 100);
  };

  drawArray = [
    rightLeg,
    leftLeg,
    rightArm,
    lefttArm,
    torso,
    head,
    frame4,
    frame3,
    frame2,
    frame1,
  ];

  // 정답 체크
  // 클릭한 카드안에 알파벳들이랑 정답이랑 글자 비교하기 indexof()
  // 맞추면 counter +, 틀리면 lives -1
  check = function () {
    list.onclick = function () {
      var guess = this.innerHTML;
      this.setAttribute("class", "active");
      this.onclick = "null";
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        }
      }
      var j = word.indexOf(guess);
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    };
  };

  //플레이
  play = function () {
    categories = [
      [
        "sparrow",
        "hippopotamus",
        "crocodile",
        "chameleon",
        "giraffe",
        "squirrel",
        "sea-gull",
      ],
      [
        "persimmon",
        "mango",
        "watermelon",
        "mandarin",
        "korean-melon",
        "strawberry",
        "plum",
      ],
      [
        "croissant",
        "cinnamon-roll",
        "fudge",
        "carrot-cake",
        "waffle",
        "macaron",
        "tiramisu",
      ],
    ];

    chosenCaegory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCaegory[Math.floor(Math.random() * chosenCaegory.length)];
    word = word.replace(/\s/g, "-");
    buttons();

    guesses = [];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  };

  play();
  getHint.onclick = function () {
    var categoryIndex = categories.indexOf(chosenCaegory);
    if (categoryIndex == 0) showClue.innerHTML = " Clue : Animals ";
    if (categoryIndex == 1) showClue.innerHTML = " Clue : Fruits ";
    if (categoryIndex == 2) showClue.innerHTML = " Clue : Dessert ";
  };

  // reset
  document.getElementById("reset").onclick = function () {
    setTimeout(function () {
      location.reload();
    }, 0);
  };
};
