var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height / 2;
var dx = 4;
var dy = -4;
var color = ["blue" , "red" , "yellow", "green"];
var hit = 0;

var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleX2 = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var scoreTop = 0;
var scoreBottom = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function drawScore(){
	ctx.font = "24px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Bottom Score: " + scoreBottom, 8, canvas.height - 20);
	ctx.fillText("Top Score: " + scoreTop, 8, 20);
}

function wait(sec) {
	let start = Date.now(), now = start;
	while (now - start < sec * 1000) {
		now = Date.now();
	}
}

function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > 0 && relativeX < canvas.width) {
		paddleX2 = relativeX - paddleWidth/2;
	}
}

function keyDownHandler(e){
	if (e.keyCode == 39){
		rightPressed = true;
	}
	else if (e.keyCode == 37){
		leftPressed = true;
	}
}

function keyUpHandler(e){
	if (e.keyCode == 39){
		rightPressed = false;
	}
	else if (e.keyCode == 37){
		leftPressed = false;
	}
}

function drawPaddleBottom(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddleTop(){
	ctx.beginPath();
	ctx.rect(paddleX2, 0, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = color[hit % 4];
	ctx.fill();
	ctx.closePath();
}

function changeBallPosition(){
	x += dx;
	y += dy;
	if (x >= canvas.width - ballRadius || x <= ballRadius)
		dx = -dx;
	if (y <= ballRadius)
	{
		if (x >= paddleX2 && x <= paddleX2 + paddleWidth)
			dy = -dy;
		else{
			x = canvas.width / 2;
			y = canvas.height / 2;
			scoreBottom++;
			wait(2);
		}
		hit++;
	}
	else if(y >= canvas.height - ballRadius) {
		if ((x >= paddleX && x <= paddleX + paddleWidth))
			dy = -dy;
		else{
			x = canvas.width / 2;
			y = canvas.height / 2;
			scoreTop++;
			wait(2);
		}
		hit++;
	}
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddleBottom();
	drawPaddleTop();
	drawScore();
	changeBallPosition();
	if (rightPressed && paddleX < canvas.width - paddleWidth)
		paddleX += 10;
	else if (leftPressed && paddleX > 0)
		paddleX -= 10;
}

setInterval(draw, 10);
