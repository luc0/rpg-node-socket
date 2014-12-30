function World( params ){

	var defaults = {

		"maps": createArray( 5 , 5 , Map )

	}

	merge( defaults , params , this );

	this.maps[0][0].tiles = createArray( 30 , 30 , Tile );

	this.maps[0][0].loadTiles( [
		[ {terrain:'agua'} , {terrain:'tierra'} , {terrain:'tierra'} , {terrain:'tierra'} , {terrain:'tierra'} ],
		[ {terrain:'agua'} , {terrain:'tierra'} , {terrain:'tierra'} , {terrain:'tierra'} , {terrain:'tierra'} ],
		[ {terrain:'agua'} , {terrain:'tierra'} , {terrain:'tierra'} , {terrain:'tierra'} , {terrain:'tierra'} ],
		[ {terrain:'agua'} , {terrain:'tierra'} , {terrain:'tierra'} , {terrain:'tierra'} , {terrain:'tierra'} ],
		[ {terrain:'agua'} , {terrain:'tierra'} , {terrain:'tierra'} , {terrain:'tierra'} , {terrain:'tierra'} ]
	] );

}