var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 4;
var dy = -4;
var color = ["blue" , "red" , "yellow", "green"];
var hit = 0;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
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
	{
		if (dx > 0)
			dx = -4 - hit % 3;
		else
			dx = 4 + hit % 3;
		hit++;
	}
	if (y <= ballRadius)
	{
		dy *= -1;
		hit++;
	}
	else if(y > canvas.height - ballRadius - paddleHeight) {
		if (x + ballRadius > paddleX && x - ballRadius < paddleX + paddleWidth)
			dy = -dy;
		else{
			document.location.reload();
		}
	}
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	changeBallPosition();
	if (rightPressed && paddleX < canvas.width - paddleWidth)
		paddleX += 7;
	else if (leftPressed && paddleX > 0)
		paddleX -= 7;
}

setInterval(draw, 10);
