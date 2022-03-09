// 전역 변수 초기화
var canvas = null;
var context = null;    
var intervalId = null;
var direction = null;        
var canvasW = 0, canvasH = 0;   
var score = 0;  

// 캔버스 초기화 
window.onload = function(){
    canvas = document.getElementById('background2');
    context = canvas.getContext('2d');     
    canvasW = canvas.width;
    canvasH = canvas.height;
    document.onkeydown = keyControl;    
    help();     
}    

function help(){
    context.font = '20px Courier';    
    context.fillStyle = '#da068b';
    context.textAlign = 'center';
    context.textBaseline = 'middle';            
    context.fillText('Game Guide',270,130);
    context.fillText('Game Start: space bar',270,180);
    context.fillText('Bar Control: Left(<-), Right(->)',270,230);            
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

    // console.log('key:' + event.keyCode + ', value: ' + selection[event.keyCode]);    
}   
    
function playGame(){            
    var dongNum = 5;
    var dong = new Array();
    for(var i = 0; i < dongNum; i++)
        dong[i] = new Dong();

    intervalId = setInterval(function(){
        context.clearRect(0,0,canvasW,canvasH); 
        for(var i = 0; i < dongNum; i++){ 
            dong[i].move();   
            dong[i].draw();
            dong[i].checkCollision(Dog);   
        }                                  
        Dog.move(); 
        Dog.draw();
        drawScore();                
    }, 20);
}  

function gameOver(){           
    clearInterval(intervalId);
    context.font = '50px Courier';
    context.fontStyle = 'blue';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText('Game Over', canvasW/2, canvasH/2);
}    
            
function drawScore(){
    context.font = '20px Courier';
    context.fillStyle = 'blue';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillText('Score: ' + score, 10, 30);
}


var Dog = {
    x: 100, 
    y: 400, 
    dogW: 80,
    dogH: 80,
    moveSpace: 20,                  
    draw: function(){            
        this.dog = new Image(); 
        this.dog.src = './image/dogRight.png';     
        context.drawImage(this.dog,this.x,this.y,this.dogW,this.dogH);          
    },
    move: function(){      
        if( direction == 'right'){
            this.x = this.x+this.moveSpace;
            if( this.x > canvasW-this.dogW)
                this.x = canvasW-this.dogW;        
        }    
        if( direction == 'left'){        
            this.x = this.x-this.moveSpace; 
            if( this.x < 0)
                this.x = 0;                   
        }    
        direction = '';   
    }
}