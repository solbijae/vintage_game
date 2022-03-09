var Dong = function(){
    this.yspeed = 1;     
    this.dongW = 40;
    this.dongH = 40;
    this.x = Math.floor(Math.random() * (canvasW-this.dongW));
    this.y = Math.floor(Math.random() * canvasH/3);         
    
    this.draw = function(){          
        var dong = new Image();
        dong.src = './image/dong.png'; 
        context.drawImage(dong,this.x,this.y,this.dongW,this.dongH);            
    }
    this.move = function(){    
        this.y += this.yspeed;   
    }    
    this.checkCollision = function(dog){    
        // Dog와의 충돌
        var centerX = this.x+this.dongW/2;
        var centerY = this.y+this.dongH/2;    
        var collideRange = 10;
        if( centerX >= (dog.x-collideRange) &&
            centerX <= (dog.x+dog.dogW+collideRange) &&
            centerY >= (dog.y-collideRange) && 
            centerY <= (dog.y+dog.dogH+collideRange))    
        {        
            gameOver();
        }
        // 바닥과의 충돌
        if(centerY > 450){
            this.x = Math.floor(Math.random() * (canvasW-this.dongW));
            this.y = Math.floor(Math.random() * (canvasH/3));    
            score++;
        }       
    }
}
