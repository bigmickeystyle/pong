var canvas;
var canvasContext;
var ballX = 800 / 2;
var ballY = 600 / 2;
var multiplyerY = 5;
var multiplyerX = 10;
var ballRadius = 10;
var paddle1Y = 200;
var paddle2Y = 300;
var paddleSpeed = 25;
var difficulty = 5;
var game = 1;
const PADDLE_HEIGHT = 150;
const PADDLE_WIDTH = 10;


$(document).ready(function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	setInterval(function(){
		drawEverything();
		moveEverything();
		}, 1000/30);
});

function moveEverything(){
	moveAI();
	ballX = ballX + multiplyerX;
	ballY = ballY + multiplyerY;
	padOffset = (PADDLE_WIDTH + 20 + ballRadius)
	
	if ((ballY < ballRadius) || (ballY >= canvas.height - ballRadius)){
		multiplyerY = -multiplyerY;
	}
	
	if ((ballX < ballRadius) || (ballX >= canvas.width - ballRadius)){
		ballReset();
	}
	
	if ((ballX < padOffset && ballX >= 20 + PADDLE_WIDTH && 
		ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) 
		|| 
	   (ballX > canvas.width - (padOffset + 10) && ballX <= canvas.width - (20 + PADDLE_WIDTH) &&	 
	    ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT))
	{
		multiplyerX = -multiplyerX;	
	}
	
}

function moveAI() {
	if (paddle2Y + PADDLE_HEIGHT / 2 < ballY - 35 && multiplyerX > 0){
		paddle2Y += difficulty;
	}
	else if (paddle2Y + PADDLE_HEIGHT / 2 > ballY + 35 & multiplyerX > 0){
		paddle2Y -= difficulty;		
	}	
}



function drawEverything() {	
	// background
	colourRect(0,0,canvas.width,canvas.height,'black');
	// ball
	console.log(game);
	if (game = 1) {
	colourBall(ballX, ballY, ballRadius, randomColour());
	}
	else
	{
		setInterval(count("3", 5000));
	}

	//left paddle
	colourRect(20,paddle1Y,PADDLE_WIDTH,PADDLE_HEIGHT,'white');
	//right paddle
	colourRect(770,paddle2Y,PADDLE_WIDTH,PADDLE_HEIGHT,'white');
}

function colourRect (LX, TY, width, height, colour){
	canvasContext.fillStyle = colour;	
	canvasContext.fillRect(LX,TY, width, height);	
}

function colourBall (LX, TY, radius, colour){
	canvasContext.fillStyle = colour;
	canvasContext.beginPath();
	canvasContext.arc(LX, TY, radius, 0, Math.PI*2, true, colour);
	canvasContext.fill();
	
}


function randomColour(){
	
	return '#'+Math.random().toString(16).substr(2,6);

}	

function count (num) {
	canvasContext.font = "30px 	Arial";
	canvasContext.fillStyle = 'white';
	canvasContext.fillText(num, 400, 200)
	
}

function ballReset () {
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
	multiplyerX = -multiplyerX;
	game = 0;
	console.log(game);
}

$(document).keydown(function(e) {
	switch(e.which) {
		case 87: //up
			if (paddle1Y > 0){
				paddle1Y -= paddleSpeed;
			}
			break;

		case 83: // down
			if (paddle1Y < canvas.height - PADDLE_HEIGHT) {
				paddle1Y += paddleSpeed;
			}
		break;

		default: return; // exit this handler for other keys
	}
	
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
