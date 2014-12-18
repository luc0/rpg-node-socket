
//Personajes.js

Abeja = function (){ classExtends(this,Graphics);
	
	this.image.src = "graficos/abeja.png"
	this.image.width = 40;
	this.image.height = 38;
	this.nombre = "abeja"
	this.width = 40;
	this.height = 38;
	this.sprite = {'frame':1,'action':1}
	this.sprite.columns = this.image.width/this.width;
	this.sprite.rows = this.image.height/this.height;
}

Flor = function (){ classExtends(this,Graphics);
	
	this.image.src = "flores.png";
	this.image.width = 300;
	this.image.height = 38;
	this.nombre = "flor";
	this.width = 30;
	this.height = 38;
	this.sprite = {'frame':1,'action':1}
	this.sprite.columns = this.image.width/this.width;
	this.sprite.rows = this.image.height/this.height;
	
	
	this.animate = function(callback){
		
		this.sprite.frame++
		if(this.sprite.frame==this.sprite.columns){
			this.sprite.frame = 1;
			if(typeof callback == 'function') callback();
		}
		this.image.position.frame = -this.sprite.frame * this.image.width / this.sprite.columns;
		
	}
}
