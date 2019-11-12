var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/miron.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звук
var zag_audio = new Audio();
var score_audio = new Audio();
var death_audio = new Audio();

zag_audio.src = "audio/zag.mp3";
score_audio.src = "audio/score.mp3";
death_audio.src = "audio/death.mp3";

var gap = 130;

// При нажатии на какую-либо кнопку//
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 35;
    zag_audio.play();
}

//Создание блоков//
var pipe = [];

pipe[0]={
    x : cvs.width,
    y : 0
};

var score = 0;
// Позиция орка//
var xPos = 10;
var yPos = 150;
var grav = 2;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        //Отслеживание прикосновений
        if(xPos + bird.width >= pipe[i].x
        && xPos <=pipe[i].x + pipeUp.width
        && (yPos <=pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height )  {
            location.reload(true);// Перезагрузка страницы 
        }

        if(pipe[i].x == 5){
            score ++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "25px Verdana";
    ctx.fillText("Прогулы: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
