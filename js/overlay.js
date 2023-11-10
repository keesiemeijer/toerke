DOMhelp={
	getTarget:function(e){
		var target = window.event ? window.event.srcElement : e ? e.target : null;
		if (!target){return false;}
		while(target.nodeType!=1 && target.nodeName.toLowerCase()!='body'){
			target=target.parentNode;
		}
		return target;
	},
	cancelClick:function(e){
		if (window.event){
			window.event.cancelBubble = true;
			window.event.returnValue = false;
		}
		if (e && e.stopPropagation && e.preventDefault){
			e.stopPropagation();
			e.preventDefault();
		}
	},
	addEvent: function(elm, evType, fn, useCapture){
		if (elm.addEventListener){
			elm.addEventListener(evType, fn, useCapture);
			return true;
		} else if (elm.attachEvent) {
			var r = elm.attachEvent('on' + evType, fn);
			return r;
		} else {
			elm['on' + evType] = fn;
		}
	}
}
slide ={
hideClass:'verborgen',
showClass:'zichtbaar',
ie:'',
container:null,
overlay:null,
init:function() {

var loc=0;
	if(document.getElementById('posts')) {
		loc=document.getElementById('posts'); 
	}
	var c=document.getElementsByTagName('BODY');
	if (c.className == 'ie'){
		slide.ie='true';
}
	if(loc==0){ return; }
	var a=loc.getElementsByTagName('a');
		for(i=0;i<a.length;i++){
			if(a[i].href.indexOf('jpg')!=-1||a[i].href.indexOf('JPG')!=-1||a[i].href.indexOf('jpeg')!=-1||a[i].href.indexOf('JPEG')!=-1||a[i].href.indexOf('png')!=-1||a[i].href.indexOf('PNG')!=-1||a[i].href.indexOf('gif')!=-1||a[i].href.indexOf('GIF')!=-1){
			DOMhelp.addEvent(a[i],'click',slide.showPic,false);
			}
		}
		if(document.getElementById('subscribe')){
	oudeHTML=document.getElementById('subscribe').innerHTML;formulier=' of ontvang de nieuwste berichten via e-mail.<form action="https://www.feedburner.com/fb/a/emailverify" method="post" target="popupwindow" onsubmit="window.open(\'https://www.feedburner.com/fb/a/emailverifySubmit?feedId=1961948\', \'popupwindow\', \'scrollbars=yes,width=550,height=520\');return true"><p>Voer hier uw e-mail adres in:</p><p><input type="text" style="width:140px" name="email"/></p><input type="hidden" value="https://feeds.feedburner.com/~e?ffid=1961948" name="url"/><input type="hidden" value="Toerke" name="title"/><input type="hidden" name="loc" value="en_US"/><input type="submit" value="Reis mee" /></form>';document.getElementById('subscribe').innerHTML=oudeHTML+formulier;}

},
showPic:function(e) {
	var t=DOMhelp.getTarget(e);
		while(	t.nodeName.toLowerCase()!='a' && t.nodeName.toLowerCase()!='body'){
						t=t.parentNode;
		} 
	if(!slide.overlay){ slide.maakContainer(); }
	slide.overlay.className=slide.showClass;
	theImg=document.getElementById('loading');
	theImg.style.display = 'block';
	theImg=document.getElementById('overlayImage');
	DOMhelp.addEvent(theImg,'click',slide.killPic,false); 
	theImg.style.display = 'none';
	DOMhelp.addEvent(theImg,'load',slide.visible,false);
	theImg.setAttribute('src',t.href);
	if(t.getAttribute('title')!=null){
	theImg.setAttribute('title',t.getAttribute('title')); }
	DOMhelp.cancelClick(e);
	
},
maakContainer:function() {
slide.overlay=document.createElement('div');
slide.overlay.setAttribute('id','overlay');
slide.overlay.setAttribute('title','Klik om te sluiten');
var theImg = document.createElement('img');
theImg.id='overlayImage';
slide.overlay.appendChild(theImg);
var theImg = document.createElement('img');
theImg.id='loading';
theImg.setAttribute('src','../../gfx/loader.gif');
slide.overlay.appendChild(theImg);
document.body.appendChild(slide.overlay);
if(slide.ie != 'true'){ 
DOMhelp.addEvent(slide.overlay,'click',slide.killPic,false); }
return;
},
visible:function() {
var theImg=document.getElementById('loading');
theImg.style.display = 'none';
theImg=document.getElementById('overlayImage');
theImg.style.display = 'block';
theImg.style.width ='';

if(slide.ie=='true'){ 

slide_ie.findHeight();
}

},
killPic:function(e) {
slide.overlay.className=slide.hideClass;
theImg=document.getElementById('overlayImage');
theImg.src='';
theImg.setAttribute('title','');
DOMhelp.cancelClick(e);
}
}
DOMhelp.addEvent(window, 'load', slide.init, false);