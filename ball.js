//전역변수 초기화
var canvas = null;
var context = null;
var intervalId = null;
var direction = null;
var score = 0;
var canvasW, canvasH;

//캔버스 초기화
window.onload = function(){
    canvas = document.getElementById('space');
    context = canvas.getContext('2d');
    canvasW = canvas.width;
    canvasH = canvas.height;
    help();
    document.onkeydown = keyControl;
}

// 도움말
function help(){
    context.font = '20px Courier';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context. fillText('Game Guide',200,130);
    context. fillText('Start Game: space bar',200,180);
    context. fillText('Bar Control: left(<-), right(->)',200,230);
}

function keyControl(){
    var selection = {
        32: 'startGame',
        37: 'left',               
        39: 'right'                
    };
    if(selection[event.keyCode] == 'startGame')
        playGame();
    else
        direction = selection[event.keyCode];  

    // 입력된 키에 대한 키값과 selection값 출력
    console.log('key: ' + event.keyCode + ', value: ' + selection[event.keyCode]);
}

var ball = {
    x: 200,
    y: 200,
    xspeed: -2,
    yspeed: 3,
    radius: 10,
    draw: function(){
        context.beginPath();
        context.arc(this.x,this.y,this.radius,0,Math.PI*2);
        context.fillStyle = 'white';
        context.fill();
    },
    move: function(){
        this.x += this.xspeed;
        this.y += this.yspeed;
    },
    checkWall: function(){
        if(this.x < 0 || this.x > canvasW)
            this.xspeed = - this.xspeed;
        if(this.y < 0)
            this.yspeed = - this.yspeed;
    }
}

var bar = {
    x: 100,
    y: 300,
    barWidth: 50,
    barHeight: 3,
    moveSpace: 20,
    barColor: 'white',
    draw: function(){
        context.fillStyle = this.barColor;
        context.fillRect(this.x, this.y, this.barWidth, this.barHeight);
    },
    move: function(){
        if(direction == 'right'){
            this.x = this.x + this.moveSpace;
            if(this.x > canvasW - this.barWidth)
                this.x = canvasW - this.barWidth;
        }
        else if(direction == 'left'){
            this.x = this.x - this.moveSpace;
            if(this.x < 0)
                this.x = 0;
        }
        direction ='';
    },
    bounceChecK: function(ball){
        if(ball.x >= (this.x) &&
            ball.x <= (this.x + this.barWidth) &&
            ball.y >= (this.y) &&
            ball.y <= (this.y + this.barHeight)){
            ball.yspeed = -ball.yspeed;
            score ++;
        }
    }
}

function playGame(){
    intervalId = setInterval(function(){
        context.clearRect(0,0,canvasW,canvasH);
        ball.draw();
        ball.move();
        ball.checkWall();
        bar.draw();
        bar.move();
        bar.bounceChecK(ball);
        drawScore();
        gameOver(ball);
    }, 20);
}

function gameOver(ball){
    if(ball.y > canvasH){
        clearInterval(intervalId);
        context.font = '50px Courier';
        context.fontStyle = 'white';
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.fillText('Game Over', canvasW/2, canvasH/2);
    }
}

function drawScore(){
    context.font = '20px Courier';
    context.fillStyle = 'white';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillText('Score: ' + score, 10, 30);
}

// replay 넣기
// 연습문제 보고 일정 단계 이상 되면 스피드 올라가기 & 장애물 설치하기 도전
