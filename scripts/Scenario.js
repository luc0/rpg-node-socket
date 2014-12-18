
//Scenario.js
Scenario = function (HTMLElement){
	this.element = HTMLElement ? HTMLElement : document.body
	this.graphics = []; //Array con los elementos gráficos
	this.buffer = [];// Array con el código html de cada elemento gráfico
	
	//Registra o Actualiza los gráficos en el escenario
	this.register = function(graphic){
		
		for(g in this.graphics){
			if(this.graphics[g].uid == graphic.uid){
				this.graphics[g] = graphic;
				this.buffer[g] = graphic.html();
				return;
			}
		}
		this.graphics.push(graphic);
		this.buffer.push(graphic.html());
	}
	
	//Elimina los gráficos del escenario
	this.unregister = function(graphic){
		
		for(g in this.graphics){
			if(this.graphics[g].uid == graphic.uid){
				this.graphics.splice(g,1);
				this.buffer.splice(g,1);
				return;
			}
		}
	}
	
	this.cleanReg = function(){
		this.graphics = [];
		this.buffer = [];
	}

	//Dibuja el escenario
	this.draw = function(){
		this.element.innerHTML = this.buffer.join('');
	}
}
