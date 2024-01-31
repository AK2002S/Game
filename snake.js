let input={x:0,y:0};
let speed=10;
let lastPaintTime=0;
let snakeArr=[{x:5,y:8}];
let food={x:16,y:15};
let score=0;
let obstacles={x:10,y:10};
let portal=[{x:4,y:4},{x:18,y:15}];

function main(currentTime){
    //start the animation
    window.requestAnimationFrame(main);
    if((currentTime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=currentTime
    gameStat();
}

function iscollided(snake){
    for(let i=1;i<snake.length;i++)
    {
        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y){
            return true;
        }
    }
    if(snake[0].x===20 || snake[0].x===0)
    {
       
        return true;
    }
    if(snake[0].y===20 || snake[0].y===0)
    {
        
        return true;
    }
    if(snake[0].x===obstacles.x && snake[0].y===obstacles.y){
        let a=2;
        let b=18;
        obstacles={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
        return true;
    }
    

    return false;
}

function gameStat(){
    //portelling

   

    if(snakeArr[0].y===portal[1].y && snakeArr[0].x===portal[1].x)
    {
        snakeArr[0].x=portal[0].x;
        snakeArr[0].y=portal[0].y;
        input={x:0,y:1};
    }
    else if(snakeArr[0].y===portal[0].y && snakeArr[0].x===portal[0].x)
    {
        snakeArr[0].x = portal[1].x;
        snakeArr[0].y = portal[1].y;
        input={x:-1,y:0};
    }
    if(iscollided(snakeArr)){
        snakeArr=[{x:5,y:8}];
        input={x:0,y:0};
        score=0;
        scoreboard.innerHTML="";
        alert("Game Over...Press any Key");
    }
    
    //if food is eaten
    if(snakeArr[0].x==food.x && snakeArr[0].y==food.y ){
        snakeArr.unshift({x: snakeArr[0].x + input.x,y: snakeArr[0].y + input.y});
        let a=2;
        let b=18;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
        score++;
        scoreboard.innerHTML="Your Score <br />" + score;
        scoreboard.classList.add("score");
    }
    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=input.x;
    snakeArr[0].y+=input.y;

    //Display the snake
    document.querySelector("#background").innerHTML="";
    snakeArr.forEach((i,index) => {
        let snakeDiv=document.createElement("div");
        background.appendChild(snakeDiv);
        snakeDiv.style.gridRowStart=i.y;
        snakeDiv.style.gridColumnStart=i.x;
        if(index===0)
        {
            snakeDiv.classList.add("head");
        }
        else{
            snakeDiv.classList.add("snake");
        }
    
    });
    //Display the food
    let foodDiv=document.createElement("div");
    background.appendChild(foodDiv);
    foodDiv.style.gridRowStart=food.y;
    foodDiv.style.gridColumnStart=food.x;
    foodDiv.classList.add("food");

    //obstacles
    let obsDiv=document.createElement("div");
    background.appendChild(obsDiv);
    obsDiv.style.gridRowStart=obstacles.y;
    obsDiv.style.gridColumnStart=obstacles.x;
    obsDiv.classList.add("obs");

    //portal
    let portalDiv=document.createElement("div");
    background.appendChild(portalDiv);
    portalDiv.style.gridRowStart=portal[0].y;
    portalDiv.style.gridColumnStart=portal[0].x;
    portalDiv.classList.add("portal");
    let portalDiv1=document.createElement("div");
    background.appendChild(portalDiv1);
    portalDiv1.style.gridRowStart=portal[1].y;
    portalDiv1.style.gridColumnStart=portal[1].x;
    portalDiv1.classList.add("portal");

}

window.requestAnimationFrame(main);
//game controll
window.addEventListener("keydown",(event)=>{
    
    switch(event.key)
    {
        case "ArrowUp":
            
            input.x=0;
            input.y=-1;
            break;
        case "ArrowDown":
            
            input.x=0;
            input.y=1;
            break;
        case "ArrowRight":
            
            input.x=1;
            input.y=0;
            break;
        case "ArrowLeft":
            
            input.x=-1;
            input.y=0;
            break;
    }
})