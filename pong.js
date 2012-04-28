pong=function(){
//600x600 screen
var width=600;
var height=400;

var screen=document.getElementById('pongCanvas').getContext('2d');
var ball={x:300,y:300,r:10};
var lastBall={x:300,y:300,r:10};
//speed vector for ball
var ballVec={x:3,y:2};


var maxSpeed=20;
var left={y:200,w:10,h:100,speed:0};
var leftVec=0;
var right={y:200,w:10,h:100,speed:0};
var rightVec=0;
var scores={left:0,right:0};

//pixel margin of error
var margin=5;
var scored=function(left){
	ball={x:300,y:300,r:10};
	ballVec={x:(left?5:-5),y:2};
	if(left){
		scores.left++;
		uScore();
	}else{
		scores.right++;
		uScore();
	}
}
var sDisp=document.getElementById('score');
var uScore=function(){
	sDisp.innerHTML=scores.left+':'+scores.right;
}
var onPaddleCollision=function(paddle){
	ballVec.x=-1.5*ballVec.x;
	ballVec.y-=paddle.speed;

}

var onFloorCollision=function(){
	ballVec.y=-ballVec.y;
}

var rect=function(x,y,w,h,ctx,color){
	ctx.fillStyle=color;
	ctx.fillRect(x,y,w,h);
}

var circle=function(x,y,r,ctx,color){
	ctx.fillStyle=color;
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI,true);
	ctx.fill();
}

var draw=function(){
	rect(0,0,width,height,screen,'black');
	rect(width/2-2.5,0,5,height,screen,'white');
	//draw left panel
	rect(0,left.y,left.w,left.h,screen,'white');
	//draw right panel
	rect(width-right.w,right.y,right.w,right.h,screen,'white');
	//draw ball
	circle(ball.x,ball.y,ball.r,screen,'white');
}
var min=function(a,b){
	if(a<b) return a;
	return b;
}
var max=function(a,b){
	if (a>b) return a;
	return b;
}
var tick=function(){
	//update speeds
	ball.x+=ballVec.x;
	ball.y+=ballVec.y;
	if(keys[69])
		left.speed=min(left.speed+10,maxSpeed);
	if(keys[68])
		left.speed=max(left.speed-10,-maxSpeed);
	if(keys[79])
		right.speed=min(right.speed+10,maxSpeed);
	if(keys[76])
		right.speed=max(right.speed-10,-maxSpeed);

	left.y-=left.speed;
	if(left.y<0){
		
	}
	right.y-=right.speed;
	left.speed*=0.7;
	right.speed*=0.7;
	ball.x*=0.999999999999999;
	ball.y*=0.9999999999999999;

	if(ball.y<0 || ball.y>height){
		onFloorCollision();
	}
	if(ball.x<=left.w){//if hits left
		if(ball.y>=left.y-margin && ball.y<=(left.y+left.h+margin)){
			onPaddleCollision(left);
		}else{//passes line left
			scored(false);
		}
	}
	if(ball.x>=width-right.w){//if hits right
		if(ball.y>=right.y-margin && ball.y<=(right.y+right.h+margin)){
			onPaddleCollision(right);
		}else{//passes line
			scored(true);
		}
	}
}

var keys=[];
document.onkeydown=function(evt){
	console.log(evt.which);
	keys[evt.which]=true;
}
document.onkeyup=function(evt){
	keys[evt.which]=false;
}
var onFrame=function(){
	draw();
	tick();
	setTimeout(onFrame,50);
}

setTimeout(onFrame,20);
};