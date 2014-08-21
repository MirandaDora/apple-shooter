// JavaScript Document


// Define a class like this
function Layer( imgId, x, y, z, scaledWidth ){

 this.img = document.getElementById(imgId); 
  this.x = this.img.style.left;
  this.y = this.img.style.top;
  this.z = this.img.style.zIndex;
  this.scaledWidth  = scaledWidth;
  this.scaledHeight = 0;//this.img.naturalHeight / this.img.naturalWidth * this.scaledWidth;
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
	res_left=delta_fx*(layerlength-wz)*15;}
	else{
		res_left=-Math.abs(delta_fx*(layerlength-wz)*15);
		}
	if(delta_fy>=0){
	res_top=delta_fy*(layerlength-wz)*20;}
	else{
		res_top=-Math.abs(delta_fy*(layerlength-wz)*20);
		}
	return [res_left, -res_top];
	
}


Layer.prototype.draw = function( canv, img, faceX, faceY, faceZ, layerlength ){
//canv is the canvas we want to draw our pics on
//in img, we have: the original points of the img, the width and hight of the img
//we will redraw the img on canv for update
	// convert face 3D position into real world coordinates in units of pixels

var temp_img=img.img;

	// Project the corners of the image
	var p0 = Layer.prototype.interceptPlaneZ( faceX, faceY, img.x, img.y, img.z, layerlength );
	//console.log(Math.round(p0[0]));


	var ctx=canv.getContext("2d");
	document.getElementById(temp_img.id).style.left=Math.round(p0[0])+"px";
	document.getElementById(temp_img.id).style.top=Math.round(p0[1])+"px";
	
	//ctx.drawImage(temp_img,Math.round(p0[0]),Math.round(p0[1]));
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

  setup : function() {
		console.log("Setup");
    window.addEventListener( "mousemove", function(e) {
      sdkDemo.documentOffsetX = e.screenX - e.clientX - window.screenX;
      sdkDemo.documentOffsetY = e.screenY - e.clientY - window.screenY;
    } );

		this.canv =document.getElementById("canvas");


		// setup the layers
		this.layers = new Array();
		this.layers[this.layers.length] = new Layer( "layer1", 0, -300, 4000, 16000 );
		this.layers[this.layers.length] = new Layer( "layer2", 0, 0, 20, 4500 );
		this.layers[this.layers.length] = new Layer( "layer3", 0, 0, -5, 4500 );
		this.layers[this.layers.length] = new Layer( "layer4", 0, 0, -5, 4500 );
		this.layers[this.layers.length] = new Layer( "layer5", 0, 0, -5, 4500 );
  },

  onApiReady : function() {
    window.postMessage( {target:"xLabs", payload:{overlayEnabled:1}}, "*" );
    window.postMessage( {target:"xLabs", payload:{overlayMode:0}}, "*" );
    window.postMessage( {target:"xLabs", payload:{clicksEnabled:1}}, "*" );
    window.postMessage( {target:"xLabs", payload:{trackingEnabled:1}}, "*" );
    window.postMessage( {target:"xLabs", payload:{trackMouse:1}}, "*" );
    window.postMessage( {target:"xLabs", payload:{pinpointEnabled:0}}, "*" );
  },

  update : function( state ) {
		var x = state.kvHeadX;
		var y = state.kvHeadY;
		var z = state.kvHeadZ;
		
		
		document.getElementById("test").innerHTML=Math.round(x);
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
    	this.layers[i].draw( this.canv, this.layers[i], this.sx, this.sy, this.layers[i].z, this.layers.length);
		}
	},

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






