


function init(){
    canvas = document.querySelector('#my-canvas');
    W = canvas.width = 1000;
    H = canvas.height = 1000;
    
    pen = canvas.getContext('2d');
    cs = 66;
    game_over = false;
    score = 5;

    // create img object for food;
    food_img = new Image();
    food_img.src = "src/apple.png";

    // trophy image
    trophy_img = new Image();
    trophy_img.src = "src/trophy.png";

    food = getRandomFood();

    snake = {
        init_len:5,
        // color:"blue",
        color:"#2C2891",
        cells:[],
        direction:"right",

        createSnake:function(){
            for(var i = this.init_len; i>0; i--){
                this.cells.push({x:i,y:0});
            }
        },

        drawSnake:function(){
            for(var i = 0; i<this.cells.length; i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },

        updateSnake:function(){

            // check if food is eaten
            // generate new food

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX==food.x && headY==food.y){
                food = getRandomFood();
                score++;
            }else{
                this.cells.pop();
            }

            
            var nextX, nextY;

            if(this.direction == "right"){
                nextX = headX + 1;
                nextY = headY;
            }else if(this.direction == 'left'){
                nextX = headX - 1;
                nextY = headY;
            }else if(this.direction == 'down'){
                nextX = headX;
                nextY = headY + 1;
            }else if(this.direction == 'up'){
                nextX = headX;
                nextY = headY - 1;
            }

            this.cells.unshift({x:nextX,y:nextY});

            // check if snake goes out of the canvas
            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);

            if(this.cells[0].y < 0 || this.cells[0].y > last_y|| this.cells[0].x < 0 || this.cells[0].x > last_x){
                game_over = true;
            }
        }
    };

    snake.createSnake();
    
    function keyPressed(e){
        if(e.key == "ArrowRight") snake.direction = "right";
        else if(e.key == "ArrowLeft") snake.direction = "left";
        else if(e.key == "ArrowDown") snake.direction = "down";
        else if(e.key == "ArrowUp") snake.direction = "up";
    }

    document.addEventListener("keydown",keyPressed);
}

function draw(){

    // erase the old frame
    pen.clearRect(0,0,W,H);

    snake.drawSnake();

    pen.fillStyle = food.color;
    // pen.fillRect(food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    
    
    pen.drawImage(trophy_img,18,20,cs,cs);
    pen.fillStyle = "blue";
    pen.font = "20px Roboto";
    pen.fillText(score,50,50);

}

function update(){
    snake.updateSnake();
}

function getRandomFood(){

    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);

    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }

    return food;
}

function gameloop(){
    if(game_over){
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop,200);

