let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerX = 0;
let playerY = 0;
let pXvel = 0;
let pYvel = 0;
let friction = 1.045;
let maxVel = 100;
let pSize = canvas.height/60;
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
	if(playerX<=0) {
		playerX = 0;
		pXvel = -pXvel/1.2
	}
	if(playerY<=0) {
		playerY = 0;
		pYvel = -pYvel/1.2
	}
	if(playerX>=canvas.width-pSize) {
		playerX = canvas.width-pSize
		pXvel = -pXvel/1.2
	}
	if(playerY>=canvas.height-pSize) {
		playerY = canvas.height-pSize
		pYvel = -pYvel/1.2
	}
	
	
	
	// Set Screen color
    ctx.fillStyle = "black";
    // Fill Screen
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	// Particles trail
	ctx.fillStyle = "#cc8888";
	ctx.fillRect(delayedX1+(pSize*0.1), delayedY1+(pSize*0.1), pSize*0.8, pSize*0.8);
	ctx.fillStyle = "#996666";
	ctx.fillRect(delayedX2+(pSize*0.2), delayedY2+(pSize*0.2), pSize*0.6, pSize*0.6);
	ctx.fillStyle = "#664444";
	ctx.fillRect(delayedX3+(pSize*0.3), delayedY3+(pSize*0.3), pSize*0.4, pSize*0.4);
	ctx.fillStyle = "#332222";
	ctx.fillRect(delayedX4+(pSize*0.4), delayedY4+(pSize*0.4), pSize*0.2, pSize*0.2);
	
    // Set Player color
    ctx.fillStyle = "#FFAAAA";
    // Draw Player
    ctx.fillRect(playerX, playerY, pSize, pSize);
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
		pSize = canvas.height/60;
	})
document.addEventListener("keydown", (ev) => { return onkey(ev, true); }, false);
document.addEventListener("keyup", (ev) => { return onkey(ev, false); }, false);

disableScroll();
loop();