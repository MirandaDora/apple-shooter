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

Layer.prototype.interceptPlaneZ = function( fx, fy, wx, wy, wz ){
	// vector from world position to face position
	//the projection function lies here
	//fx,fy is the position of a user's face
	//wx,wy,wz is the position of original pic's position
	//the function will return a left and top point to show the new position of the pic
	//-----------
	//the middle point of the face is (5,2)
	var delta_fx=fx-3;
	var delta_fy=fy-2;
	var res_left;
	var res_top;
	if(delta_fx>=0){
	res_left=delta_fx*(wz)*10;}
	else{
		res_left=-Math.abs(delta_fx*(wz)*10);
		}
	if(delta_fy>=0){
	res_top=delta_fy*(wz)*10;}
	else{
		res_top=-Math.abs(delta_fy*(wz)*10);
		}
	return [res_left, res_top];
	
}


Layer.prototype.draw = function( canv, img, faceX, faceY, faceZ ){
//canv is the canvas we want to draw our pics on
//in img, we have: the original points of the img, the width and hight of the img
//we will redraw the img on canv for update
	// convert face 3D position into real world coordinates in units of pixels

var temp_img=img.img;

	// Project the corners of the image
	var p0 = Layer.prototype.interceptPlaneZ( faceX, faceY, temp_img.left, temp_img.top, temp_img.style.zIndex );
	//console.log(Math.round(p0[0]));


	var ctx=canv.getContext("2d");
	
	document.getElementById("test").innerHTML=faceX;
	document.getElementById("layer1").style.left=Math.round(p0[0]);
	document.getElementById("layer1").style.top=Math.round(p0[1]);
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

  },

  onApiReady : function() {
    window.postMessage( {target:"xLabs", payload:{overlayEnabled:1}}, "*" );
    window.postMessage( {target:"xLabs", payload:{overlayMode:0}}, "*" );
    window.postMessage( {target:"xLabs", payload:{clicksEnabled:1}}, "*" );
    window.postMessage( {target:"xLabs", payload:{trackingEnabled:1}}, "*" );
    window.postMessage( {target:"xLabs", payload:{trackMouse:1}}, "*" );
    window.postMessage( {target:"xLabs", payload:{pinpointEnabled:0}}, "*" );
  },



  onApiState : function( state ) {
	  
		var x = state.kvHeadX;
		var y = state.kvHeadY;
		var z = state.kvHeadZ;
		
		
		
		document.getElementById("layer1").style.left=(x*50)+"px";
		document.getElementById("layer1").style.top=300;
		document.getElementById("test").innerHTML=document.getElementById("layer1").style.top;
  }

};

document.addEventListener( "xLabsApiReady", function() {
  sdkDemo.onApiReady();
} );

document.addEventListener( "xLabsApiState", function( event ) {
  sdkDemo.onApiState( event.detail );
} );


window.onload=sdkDemo.setup();






