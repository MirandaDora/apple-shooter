// JavaScript Document// JavaScript Document
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

		// setup the layers
		this.layers = new Array();
		this.layers[this.layers.length] = new Layer( "bg", 0, 0, 0, 16000 );

		
		//manipulate the gun
		
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
		
		
	},
	

	kill:function(e)
	{
		if(e.keyCode==32){
	window.location.replace("game.html");
	
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

sdkDemo.setup();
document.body.addEventListener("keydown",function(event){sdkDemo.kill(event);});

//high score?
function returning_visitor()
{
	var co=getCookie("shooting_apple_rank0");
	if(co!=null){ console.log(co);return true;}
else
{
	return false;//not a returning visitor
	}
	}



function getCookie(c_name)
{
if (document.cookie.length>0)
  {
	 console.log("not null"); 
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 ;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return document.cookie.substring(c_start,c_end);
    } 
  }
return null;
}





