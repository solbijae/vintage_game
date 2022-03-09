var Dog = {
    x: 100, 
    y: 400, 
    dogW: 80,
    dogH: 80,
    moveSpace: 20,                  
    draw: function(){            
        this.dog = new Image(); 
        this.dog.src = './img/dogRight.png';     
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