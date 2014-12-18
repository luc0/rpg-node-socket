
//Graphics.js
Graphics = function (){
	this.uid = 'g'+parseInt(Math.random()*1000000000);
	this.htmlModel = '<div data-uid="'+this.uid+'" style="position:absolute;left:{{x}}px;top:{{y}}px;background:url({{src}}) no-repeat;width:{{width}}px;height:{{height}}px;background-position:{{frame}}px {{action}}px"></div>'
	this.position = {
		x:0,
		y:0,
		z:0
	}
	
	this.width = 40;
	this.height = 38;
	
	this.image = {
		'src': "",
		'position':{
			'frame':0,
			'action':0
		},
		'width':0,
		'height':0
	}
	this.html = function(){
		
		exp = /\{\{(\w+)\}\}/
		html='';
		m = '';
		html = this.htmlModel;
		while(m = html.match(exp)){
			switch(m[1]){
			case "x":
			case "y":
			case "z":
				html = html.replace(exp,this.position[m[1]]);
				break;
			case "width":
			case "height":
				html = html.replace(exp,this[m[1]]);
				break;
			case "action":
				html = html.replace(exp,this.sprite[m[1]]);
				break;
			case "src":
				html = html.replace(exp,this.image[m[1]]);
				break;
			case "frame":
				html = html.replace(exp,this.image.position[m[1]]);
				break;
			}
		}
		
		return html;
	}
	
}