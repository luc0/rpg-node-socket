console.log('Clase User -> OK');

//------------------------------------------------------------------
// User
//------------------------------------------------------------------

var Preload = function(){

	this.percent;
	this.assetsTotalCount = 0;
	this.assetsLoadedCount = 0;

	this.elementLoaded = function(){
		console.log('Cargado!')
        this.assetsLoadedCount++;
        if( this.assetsLoadedCount ){
        	//document.getElementById('elementsLoaded').innerHTML = this.assetsLoadedCount;
        	if( document.getElementById('percent') ){
        		document.getElementById('percent').innerHTML = Math.round(this.assetsLoadedCount / this.assetsTotalCount * 100) + '%';
        	}
    	}
        if( this.assetsLoadedCount == this.assetsTotalCount ){
        	this.done();
        }
    }

	this.init = function( params ){
    	
		var sounds = params.sounds;
		var total = 0;
		if( sounds ){
			for( s in sounds ) total++
			this.assetsTotalCount = total;
			for( s in sounds ){
        		sounds[ s ].addEventListener('canplaythrough', this.elementLoaded.bind(this) );
        	}
    	}
	}

	this.done = function(){
		var html_percent = document.getElementById('percent');
		var html_loading_txt = document.getElementById('loading-text');

		if( html_percent ){
			html_percent.remove();
		}
		if( html_loading_txt ){
			document.getElementById('loading-text').innerHTML = 'Cargando mundo...';
		}
		return true;
	}


}
