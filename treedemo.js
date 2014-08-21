// JavaScript Document
//treemoveDemo
// Just add the layers on line 90, this will create the 3d parallax effect
// On html side, to put the img on a certain point, specify the margin value will work
// for the z_index, 0 will never move, 1 will move alittle, 100 will move crazy.


// Define a class like this
function Layer( imgId, x, y, z, scaledWidth ){

 this.img = document.getElementById(imgId); 
  this.x = this.img.style.left;
  this.y = this.img.style.top;
  this.z = this.img.style.zIndex;
  this.width  = this.img.width;
  this.height=this.img.height;
  this.top  = this.img.top;
}

Layer.prototype.interceptPlaneZ = function( fx, fy, wx, wy, wz,layerlength ){
	// vector from world position to face position
	//the projection function lies here
	//fx,fy is the position of a user's face
	//wx,wy,wz is the position of original pic's position
	//the function will return a left and top point to show the new position of the pic
	//-----------
	//the middle point of the face is (5,2)
	var delta_fx=fx;
	var delta_fy=fy;
	var res_left;
	var res_top;
	if(delta_fx>=0){
	res_left=delta_fx*(wz);}
	else{
		res_left=-Math.abs(delta_fx*(wz));
		}
	if(delta_fy>=0){
	res_top=delta_fy*(wz)*0.8;}
	else{
		res_top=-Math.abs(delta_fy*(wz)*0.8);
		}
	return [res_left, -res_top];
	
}

Layer.prototype.drawGun=function(img,x,y,indexZ,layerlength,faceZv)
{
	//var gun=document.getElementById("gun");
	var faceX=-1;
	var faceY=-1;
	alpha = 0;
		if( faceX == -1 ) {
			faceX =x;
			faceY =y;
		}
		//faceX = Math.floor(x*50)/50;
		//faceY =Math.floor(y*50)/50;
	
	var scaleW=Math.floor((document.body.clientWidth/5000)*12);
	var scaleH=Math.floor((document.body.clientHeight/3000)*10);
	var delta_fx=faceX;
	var delta_fy=faceY;
	var res_left;
	var res_top;
	if(delta_fx>=0){
		//delta_fx>0, the head is moving to the left, so the left value should be reduced!
	res_left=Math.abs(Math.abs(delta_fx*scaleW)*100-document.body.clientWidth/2);
	}
	else{
		res_left=Math.abs(Math.abs(delta_fx*scaleW)*100+document.body.clientWidth/2);
		}
	if(delta_fy>=0){
	res_top=Math.abs(Math.abs(delta_fy*scaleH)*100+document.body.clientHeight/2);}
	else{
		res_top=Math.abs(Math.abs(delta_fy*scaleH)*100-document.body.clientHeight/2);
		}

	document.getElementById("gun").style.left=Math.round(res_left)+"px";
	document.getElementById("gun").style.top=Math.round(res_top)+"px";

	}
	

Layer.prototype.draw = function(  img, faceX, faceY, indexZ, layerlength , faceZv){
//canv is the canvas we want to draw our pics on
//in img, we have: the original points of the img, the width and hight of the img
//we will redraw the img on canv for update
	// convert face 3D position into real world coordinates in units of pixels

var temp_img=img.img;
	// Project the corners of the image
	var p0 = Layer.prototype.interceptPlaneZ( faceX, faceY, img.x, img.y, img.z, layerlength );

	document.getElementById(temp_img.id).style.left=Math.round(p0[0])+"px";
	document.getElementById(temp_img.id).style.top=Math.round(p0[1])+"px";
	//ctx.drawImage(temp_img,Math.round(p0[0]),Math.round(p0[1]));
}

//for all the apples:
function Apples(apple)
{
	this.appleId=apple.id;
	this.widths=apple.width;
	this.x=apple.style.left;
	this.y=apple.style.top;
	this.z=apple.style.zIndex;
	this.exploed=2;//0 is exploed, not grow back, invisible;
	//1 is growing back, visible, will reduce life if shooted;
	//2 is nomal status, visible
	}
	
Apples.prototype.resize=function(an_apple)
{//resize the apples based on the z-index
var z=an_apple.z;
document.getElementById(an_apple.appleId).width=an_apple.widths-Math.floor(z*0.7)+15;
	}
	
Apples.prototype.growback=function(an_apple)
{//control the apple to growback

var status=an_apple.exploed;
if(true){
var apple=document.getElementById(an_apple.appleId);
apple.src="images/applechange.gif";
apple.width=10;
apple.style.visibility="visible";

var growing_up=window.setInterval(growing,80);
setTimeout(grape,3000);


function growing()
{
	var resized_widths=parseInt(an_apple.widths)-Math.floor(an_apple.z*0.8)+15;
	if(parseInt(apple.width)<resized_widths)
	{
		apple.width=parseInt(apple.width)+1;
		}
	else apple.src="images/apple1.png";
	}
	
function grape()
{
	window.clearInterval(growing_up);
	apple.src="images/apple1.png";
	an_apple.exploed=2;//set the status to normal
	console.log("grape");
	}
	

	}}

Apples.prototype.apple_move=function(an_apple, fx, fy, fz)
{//apples also moves ,but much slower than the tree
	var delta_fx=fx;
	var delta_fy=fy;
	var res_left;
	var res_top;
	var scaler=1;
	if(delta_fx>=0){
	res_left=delta_fx*(an_apple.z)*scaler;}
	else{
		res_left=-Math.abs(delta_fx*(an_apple.z)*scaler);
		}
	if(delta_fy>=0){
	res_top=delta_fy*(an_apple.z)*scaler;}
	else{
		res_top=-Math.abs(delta_fy*(an_apple.z)*scaler);
		}
		var apple=document.getElementById(an_apple.appleId);

	document.getElementById(an_apple.appleId).style.left=parseInt(an_apple.x,10)+Math.round(res_left)+"px";
	document.getElementById(an_apple.appleId).style.top=parseInt(an_apple.y,10)-Math.round(res_top)+"px";
	//document.getElementById(an_apple.appleId).width=parseInt(an_apple.width)+fz;
	}

var sdkDemo = {
  documentOffsetX : 0, // offset of HTML document origin from screen origin
  documentOffsetY : 0,

	bg : null,
	fg : null,
	canv : null, // main canvas

	sx : -1,
	sy : -1,
	sz : -1,

	layers : null,
	move:0,
	//move is for face detection

  setup : function() {
		console.log("Setup");
		//load the outofservice effect, so that later program can call the functions
    var out_effect=document.createElement("script");
		out_effect.setAttribute("type","text/javascript");
		out_effect.setAttribute("src","outofservice.js");
		document.body.appendChild(out_effect);


		// setup the layers
		this.layers = new Array();
		this.layers[this.layers.length] = new Layer( "tree_1_1", 0, 0, 0, 16000 );
		this.layers[this.layers.length] = new Layer( "tree_1_2", 0, 0, 0, 16000 );
		this.layers[this.layers.length] = new Layer( "tree_2_1", 0, 0, 0, 16000 );
		this.layers[this.layers.length] = new Layer( "tree_2_2", 0, 0, 0, 16000 );
		this.layers[this.layers.length] = new Layer( "tree_3_1", 0, 0, 0, 16000 );
		//this.layers[this.layers.length] = new Layer( "branch", 0, 0, 0, 16000 );
		this.layers[this.layers.length] = new Layer( "top", 0, 0, 0, 16000 );
		this.layers[this.layers.length] = new Layer( "top_sha", 0, 0, 0, 16000 );
		
		//manipulate the gun
		this.gun=new Layer("gun", 0, 0, 0, 16000);
		//this.layers[this.layers.length] = new Layer( "behind", 0, 0, 20, 4500 );
		//load the apples:
		var num_of_apple=Math.floor(Math.random()*4+8);
		while(num_of_apple>0)
		{
			var img=document.createElement("img");
			img.src="images/apple1.png";
			img.style.zIndex=Math.round(Math.abs(Math.random()*7+25));//zIndex should between 10 to 35
			img.style.top=Math.round(Math.abs(Math.random()*(document.body.clientHeight/2)+50));
			img.style.left=Math.round(Math.abs(Math.random()*(document.body.clientWidth/1.5)+150));
			img.width=40;
			img.style.position="fixed";
			img.id="apple"+num_of_apple;
			img.className="apple";
			document.body.appendChild(img);
			num_of_apple--;
			}
		var apples=document.getElementsByClassName("apple");
		this.all_apples=new Array();
		for(var i=0; i<apples.length; ++i){
		this.all_apples[i]=new Apples(apples[i]);
		this.all_apples[i].resize(this.all_apples[i]);
		}
  },

  onApiReady : function() {
    window.postMessage( {target:"xLabs", payload:{overlayEnabled:0}}, "*" );
    window.postMessage( {target:"xLabs", payload:{overlayMode:0}}, "*" );
    window.postMessage( {target:"xLabs", payload:{clicksEnabled:0}}, "*" );
    window.postMessage( {target:"xLabs", payload:{trackingEnabled:1}}, "*" );
    window.postMessage( {target:"xLabs", payload:{trackMouse:0}}, "*" );
    window.postMessage( {target:"xLabs", payload:{pinpointEnabled:0}}, "*" );
    window.postMessage( {target:"xLabs", payload:{realtimeEnabled:1}}, "*" );
  },

  update : function( state ) {
	   
		var x = state.kvHeadX;
		var y = state.kvHeadY;
		var z = state.kvHeadZ;
		
		alpha = 0.6;
		if( this.sx == -1 ) {
			this.sx = x;
			this.sy = y;
		this.sz = z;
		}
		this.sx = alpha * this.sx + (1-alpha) * x;
		this.sy = alpha * this.sy + (1-alpha) * y;
		this.sz = alpha * this.sz + (1-alpha) * z;

		var i;
		for( i = 0; i < this.layers.length; ++i) {
    	this.layers[i].draw( this.layers[i], this.sx, this.sy, this.layers[i].z, this.layers.length, Math.round(z*100));
		}
		//guns should be more smoothed, I will perform the smooth in the function
		this.gun.drawGun(this.gun, this.sx, this.sy, this.gun.z, this.gun.length, Math.round(z*100));
		
		//move the apples:
		for(var j=0;j<this.all_apples.length; ++j)
		{
			this.all_apples[j].apple_move(this.all_apples[j], this.sx, this.sy, Math.round(z*100));
			}
	
	  //mouse event:
		
	},
	pause_and_continue:function()
	{//everyting stay still
	//event lisitener won't work here
	if(this.move>100){
		this.move=false;
		comeback();
		}
	else this.move+=1;
		},

	kill:function(e)
	{
		if(e.keyCode==32){
		//where is the gun?
	var gun=document.getElementById("gun");
	var gun_x=parseInt(gun.style.left)+gun.width/4;
	var gun_y=parseInt(gun.style.top)+gun.height/4;
	//where is the apple?
	var apple;
	var apple_x;
	var apple_y;
	for(var i=0;i<this.all_apples.length;++i)
	{
		apple=document.getElementById(this.all_apples[i].appleId);
		apple_x=parseInt(apple.style.left);
		apple_y=parseInt(apple.style.top);
		
		if(Math.abs(gun_x-apple_x)<50&&Math.abs(gun_y-apple_y)<50&&this.all_apples[i].exploed==2){
			//play a small animation to make the apple exploed
			console.log(this.all_apples[i].exploed);
			var exploed=document.createElement("img");
			exploed.src="images/expoled.gif";
			exploed.id="exploed"+i;
			exploed.style.zIndex=apple.style.zIndex;
			exploed.style.left=apple_x-20;
			exploed.style.top=apple_y-10;
			exploed.width=apple.width*3;
			exploed.style.position="fixed";
			document.body.appendChild(exploed);
			setTimeout("document.getElementById('exploed"+i+"').parentNode.removeChild(document.getElementById('exploed"+i+"'))",1500);
			//delete the apple from tree and array
			apple.style.visibility="hidden";
			var apple_collected=parseInt(document.getElementById("apple_collected").innerHTML);
			document.getElementById("apple_collected").innerHTML=apple_collected+1;
			this.all_apples[i].exploed=0;
			//if(apple_collected+1>=this.all_apples.length)comeback();
			
			//control the apple to grow back
			var tim=Math.random()*8000+1000;
			var this_apple=this.all_apples[i];
			window.setTimeout(function(){this_apple.growback(this_apple);},tim);
			window.setTimeout(function(){this_apple.exploed=2;},tim+5000);
			
			//controle the life bar
			var lifebar=parseInt(document.getElementById("score").width);
			if(lifebar+50>281)document.getElementById("score").width=281;
			else document.getElementById("score").width+=60;

		}}
		}},
  onApiState : function( state ) {

		this.update( state );

  }

};

document.addEventListener( "xLabsApiReady", function() {
  sdkDemo.onApiReady();
} );

document.addEventListener( "xLabsApiState", function( event ) {
  sdkDemo.onApiState( event.detail );
} );

setTimeout(sdkDemo.setup(),3000);
document.body.addEventListener("keydown",function(event){sdkDemo.kill(event);});






