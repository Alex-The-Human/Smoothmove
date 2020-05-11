let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = screen.width/1.56;
canvas.height = screen.height/1.5;

let playerX = 0;
let playerY = 0;
let pXvel = 0;
let pYvel = 0;
let friction = 1.055;
let maxVel = 5;
let pSize = 25;

function move(e){
	
	//alert(e.keyCode);
	if(e.keyCode==65){
		pXvel-=1;
	}
	if(e.keyCode==68){
		pXvel+=1;
	}
	if(e.keyCode==87){
		pYvel-=1;
	}
	if(e.keyCode==83){
		pYvel+=1;
	}
	
}

function loop() {
	
	//MOVEMENT SCRIPT
	if(pXvel!==0) {
		pXvel = pXvel / friction;
	}
	if(pYvel!==0) {
		pYvel = pYvel / friction;
	}
		//max speed
	if(pXvel>=maxVel) {
		pXvel = maxVel;
	}
	if(pXvel<=-maxVel) {
		pXvel = -maxVel;
	}
	if(pYvel>=maxVel) {
		pYvel = maxVel;
	}
	if(pYvel<=-maxVel) {
		pYvel = -maxVel;
	}
		//actual movement
	playerX = playerX + pXvel;
	playerY = playerY + pYvel;
	
	//border collisions
	if(playerX<=0) {
		playerX = 0;
	}
	if(playerY<=0) {
		playerY = 0;
	}
	if(playerX>=canvas.width-pSize) {
		playerX = canvas.width-pSize
	}
	if(playerY>=canvas.height-pSize) {
		playerY = canvas.height-pSize
	}
	
	// Set Screen Colour
    ctx.fillStyle = "black";
    // Fill Screen
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Set Player Colour
    ctx.fillStyle = "pink";
    // Draw Player
    ctx.fillRect(playerX, playerY, pSize, pSize);
	setTimeout(loop, 1000/60)
}

function disableScroll() {
	document.documentElement.style.overflow = 'hidden';
	document.body.scroll = "no";
}

document.onkeydown = move;

disableScroll();
loop();