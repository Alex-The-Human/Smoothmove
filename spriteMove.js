let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerX = 0;
let playerY = 0;
let pXvel = 0;
let pYvel = 0;
let friction = 1.045;
let maxVel = canvas.width/100;
let pScale = 10
let pSize = canvas.height/pScale;
let keys = {
	w: false,
	a: false,
	s: false,
	d: false
}
let accel = 1;
let delayedX1 = 0;
let delayedY1 = 0;
let delayedX2 = 0;
let delayedY2 = 0;
let delayedX3 = 0;
let delayedY3 = 0;
let delayedX4 = 0;
let delayedY4 = 0;

//player sprite
var playerSprite = new Image; 
playerSprite.src = "purpleTankturretScaled.png";
var spriteDim = 384;

//tile texture
var tile = new Image; 
tile.src = "background.Scaled.png";
var tileDim = 256;
var tileSize = canvas.height/10;

var ui = new Image;
ui.src = "ui.png";

var noise = new Image;
noise.src = "noise.png";

function onkey(e, pressed){
	
	//alert(e.keyCode);
	if(e.code=="KeyW"){
		keys.w = pressed;
	}
	if(e.code=="KeyA"){
		keys.a = pressed;
	}
	if(e.code=="KeyS"){
		keys.s = pressed;
	}
	if(e.code=="KeyD"){
		keys.d = pressed;
	}
	
}

function move() {
	if(keys.w) {
		pYvel-=accel;
	}
	if(keys.a) {
		pXvel-=accel;
	}
	if(keys.s) {
		pYvel+=accel;
	}
	if(keys.d) {
		pXvel+=accel;
	}
}

function loop() {

	move();
	
// MOVEMENT SCRIPT
	delayedX4 = delayedX3;
	delayedY4 = delayedY3;
	delayedX3 = delayedX2;
	delayedY3 = delayedY2;
	delayedX2 = delayedX1;
	delayedY2 = delayedY1;
	delayedX1 = playerX;
	delayedY1 = playerY;
	if(pXvel!==0) {
		pXvel = pXvel / friction;
	}
	if(pYvel!==0) {
		pYvel = pYvel / friction;
	}
		// max speed
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
		// actual movement
	playerX = playerX + pXvel;
	playerY = playerY + pYvel;
	
	// border collisions
	if(playerX<=-pSize*0.29) {
		playerX = -pSize*0.29;
		pXvel = -pXvel/1.2
	}
	if(playerY<=-pSize*0.3) {
		playerY = -pSize*0.29;
		pYvel = -pYvel/1.2
	}
	if(playerX>=canvas.width-pSize+pSize*0.29) {
		playerX = canvas.width-pSize+pSize*0.29
		pXvel = -pXvel/1.2
	}
	if(playerY>=canvas.height-pSize+pSize*0.29) {
		playerY = canvas.height-pSize+pSize*0.29
		pYvel = -pYvel/1.2
	}
	
	
	
	// Set Screen color
    ctx.fillStyle = '#489fa5';
    // Fill Screen
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	/*for(let i = 0; i <canvas.width/tileSize; i++) {
		for(let k = 0; k <canvas.height/tileSize; k++) {
			ctx.drawImage(tile, 0, 0, tileDim, tileDim, i*tileSize, k*tileSize, tileSize, tileSize)
		}
	}*/
	ctx.globalAlpha = 0.1;
	ctx.drawImage(noise, 0, 0, 1024, 1024, 0, 0, canvas.width, canvas.height*2);
	ctx.globalAlpha = 1.0;
	ctx.drawImage(playerSprite, 0, 0, spriteDim, spriteDim, playerX, playerY, pSize, pSize);
	ctx.globalAlpha = 0.9;
	ctx.drawImage(ui, 0, 0, 1024, 512, 0, 0, canvas.width, canvas.height);
	ctx.globalAlpha = 1.0;
	setTimeout(loop, 1000/60)
	
}

// Disable Scroll Bar
function disableScroll() {
	document.documentElement.style.overflow = 'hidden';
	document.body.scroll = "no";
}

window.addEventListener('resize',
	function(){
		canvas.width = innerWidth
		canvas.height = innerHeight
		pSize = canvas.height/pScale;
		maxVel = canvas.width/100;
		tileSize = canvas.height/10;
		/*for (let i = 0; i <= canvas.height; i+tileSize) {
			for (let j = 0; j <= canvas.width; j+tileSize) {
				ctx.drawImage(tile, 0, 0, tileDim, tileDim, j, i, tileSize, tileSize)
			}
		}*/
	})
	
window.addEventListener('mousemove', function (event) {
	var mouseX = event.clientX;
	var mouseY = event.clientY;
});
	
document.addEventListener("keydown", (ev) => { return onkey(ev, true); }, false);
document.addEventListener("keyup", (ev) => { return onkey(ev, false); }, false);

disableScroll();
loop();