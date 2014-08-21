// JavaScript Document
//control the lifebar
var lifebar=window.setInterval(counting_down,40);
var ingame=true;
function counting_down()
{
	if(ingame==true){
	var counter=document.getElementById("score");
	counter.width=parseInt(counter.width)-1;
	if(parseInt(counter.width)<1)
	{	
	window.clearInterval(lifebar);
	ingame=false;
	die();
	}
	}
	}
	
function die()
{
	window.clearInterval(lifebar);
	var bg=document.createElement("img");
	bg.src="images/dark.jpg";
	bg.width=document.body.clientWidth;
	bg.height=document.body.clientHeight;
	bg.style.position="absolute";
	bg.style.zIndex=2000;
	bg.style.opacity=0.3;
	bg.id="comeback";
	document.body.appendChild(bg);
	var shutdown=window.setInterval(bg_effect,1);
	setTimeout(function(){window.clearInterval(shutdown);},5500);
	document.getElementById("win_loose").innerHTML=""
	ranking();
	
	}
	
var shutdown;
function comeback()
{
	if(ingame==true){
	window.clearInterval(lifebar);
	var bg=document.createElement("img");
	bg.src="images/dark.jpg";
	bg.width=document.body.clientWidth;
	bg.height=document.body.clientHeight;
	bg.style.position="absolute";
	bg.style.zIndex=2000;
	bg.style.opacity=0.3;
	bg.id="comeback";
	document.body.appendChild(bg);
	shutdown=window.setInterval(bg_effect,1);
	//
	setTimeout(function(){window.clearInterval(shutdown);},5500);
	document.getElementById("win_loose").innerHTML="You Win!"
	ranking();
	ingame=false;
	}
	//
	}
	
	function bg_effect()
	{
		window.clearInterval(lifebar);
		var a=parseFloat(document.getElementById("comeback").style.opacity)+0.05;
		document.getElementById("comeback").style.opacity=a;
		if(a>1){window.clearInterval(shutdown);}

	}
	
//ranking stuffs
function ranking(){
window.clearInterval(lifebar);
var rank=[];
for(var i=0;i<5;i++)
{
	var co=parseInt(getCookie('shooting_apple_rank'+i));
	console.log(document.cookie);
	if(co!=0)rank[rank.length]=co;
	else {
		setCookie('shooting_apple_rank'+i,0,1);
		rank[rank.length]=0;}
	}
	var cur=parseInt(document.getElementById("apple_collected").innerHTML);
	
	rank[rank.length]=cur;
	rank=(rank.sort(sortNumber));
for(var i=0;i<5;i++)
{
	setCookie("shooting_apple_rank"+i,rank[i],1);
	document.getElementById("rank"+i).innerHTML=rank[i];
	}
	document.getElementById("current_result").innerHTML=cur;
	document.getElementById("result").style.visibility="visible";
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
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 ;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return document.cookie.substring(c_start,c_end);
    } 
  }
return 0;
}

function sortNumber(a,b)
{
return b-a;
}

	