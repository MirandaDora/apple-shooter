

// Define a class like this
function Layer( imgId, x, y, z, scaledWidth ){

 this.img = document.getElementById( imgId ); 
  this.x = x;
  this.y = y;
  this.z = z;
  this.scaledWidth  = scaledWidth;
  this.scaledHeight = this.img.naturalHeight / this.img.naturalWidth * this.scaledWidth;
}

Layer.prototype.interceptPlaneZ = function( fx, fy, fz, wx, wy, wz ){
	// vector from world position to face position
	var vx = fx - wx;
	var vy = fy - wy;
	var vz = fz - wz;
	
	// solve for t so that the vector intersects the z=0 plane
  // this.z + vz * t = 0
	var t = -wz / vz;

	// Find the x y of the intercept
	var x = wx + vx * t;
	var y = wy + vy * t;



	return [x, y];
}


Layer.prototype.draw = function( ctx, faceX, faceY, faceZ ){

	// convert face 3D position into real world coordinates in units of pixels
	faceX *= 300;
	faceY *= 300;
	faceZ *= 40000;

	// Project the corners of the image
	var p0 = Layer.prototype.interceptPlaneZ( faceX, faceY, faceZ,
			this.x-this.scaledWidth /2,
			this.y-this.scaledHeight/2,
			this.z );
	var p1 = Layer.prototype.interceptPlaneZ( faceX, faceY, faceZ,
			this.x+this.scaledWidth /2,
			this.y+this.scaledHeight/2,
			this.z );
	
	var w = Math.abs( p1[0] - p0[0] );
	var h = Math.abs( p1[1] - p0[1] );
	


	p0[0] += ctx.canvas.width/2;
	p0[1] += ctx.canvas.height/2;
	
	
	ctx.drawImage( this.img, p0[0], p0[1], w, h );
}


var sdkDemo = {
  documentOffsetX : 0, // offset of HTML document origin from screen origin
  documentOffsetY : 0,

	bg : null,
	fg : null,
	c : null, // main canvas
	cc : null, // main canvas context

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

		this.c = document.getElementById("canvas");
		console.log( this.c );

	  this.c.setAttribute( "width",  window.innerWidth  );
	  this.c.setAttribute( "height", window.innerHeight );
	  this.cc = this.c.getContext("2d");

		// setup the layers
		this.layers = new Array();
		this.layers[this.layers.length] = new Layer( "bg", 0, -300, 4000, 16000 );
		this.layers[this.layers.length] = new Layer( "keyhole", 0, 0, 20, 4500 );
		this.layers[this.layers.length] = new Layer( "door", 0, 0, -5, 4500 );
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
		console.log( state.kvHeadX );
		console.log( state.kvHeadY );
		console.log( state.kvHeadZ );

		alpha = 0.6;
		if( this.sx == -1 ) {
			this.sx = x;
			this.sy = y;
			this.sz = z;
		}
		this.sx = alpha * this.sx + (1-alpha) * x;
		this.sy = alpha * this.sy + (1-alpha) * y;
		this.sz = alpha * this.sz + (1-alpha) * z;

		// draw the page background
		this.cc.fillStyle = "rgb(0,0,0)";
		this.cc.fillRect( 0, 0, this.c.width, this.c.height );

		// draw layers
		var pixelScale = 1;
		var i;
		for( i = 0; i < this.layers.length; ++i) {
    	this.layers[i].draw( this.cc, -this.sx, this.sy, -this.sz );
		console.log("---------------")
		console.log(this.layers[i].img);
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






