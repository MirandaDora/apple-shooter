// JavaScript Document


function returning_visitor()
{
	var co=getCookie("shooting_apple_rank0");
	if(co!=null){ console.log(co);return true;}
else
{
	return false;//not a returning visitor
	}
	}
function main()
{
	//have you ever visited the game?
var co=getCookie("shooting_apple_rank0");
if(co!=null){
document.getElementById("options").innerHTML="welcome back! <br> Can you beat your highest score?";
showranking();}
else
{

	document.getElementById("options").innerHTML="You are new to the game! <br>Here is the guaidences for you to start the game:";
	}
}
	
	
function showranking()
{
	console.log(document.getElementById("rank0"));
	for(var i=0;i<5;i++)
	{
		var co=getCookie("shooting_apple_rank"+i);
		if(co!=null)
		{
			document.getElementById("rank"+i).innerHTML=co;
			}
		}
	document.getElementById("ranking").style.visibility="visible";
	}
 var sdkDemo = {


    onApiState : function( state ) {
      var x0 = state.kvTrackingEnabled;
	  if(x0!=1){return false;}
	  else {console.log(state.kvTrackingEnabled);return true;}
    },

    onApiReady : function() {
      window.postMessage( {target:"xLabs", payload:{overlayEnabled:0}}, "*" );
    window.postMessage( {target:"xLabs", payload:{overlayMode:0}}, "*" );
    window.postMessage( {target:"xLabs", payload:{clicksEnabled:0}}, "*" );
    window.postMessage( {target:"xLabs", payload:{trackingEnabled:1}}, "*" );
    window.postMessage( {target:"xLabs", payload:{trackMouse:0}}, "*" );
    window.postMessage( {target:"xLabs", payload:{pinpointEnabled:0}}, "*" );
    window.postMessage( {target:"xLabs", payload:{realtimeEnabled:1}}, "*" );
    }
  };	
function check_xlabs()
{
	

  document.addEventListener( "xLabsApiReady", function() {
    sdkDemo.onApiReady();
  } );

	}
function setCookie(c_name,value,expiredays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+"="+value+((expiredays==null)?"": "; expires="+exdate.toGMTString());
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
