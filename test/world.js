function World(){

	var defaults = {

		"maps": createArray( 5 , 5 , Map );

	}

	maps[0][0] = createArray( 10 , 10 , Tile );

	world.maps[0][0].load( [
		[ {terrain:FLOOR.WAT} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} ],
		[ {terrain:FLOOR.WAT} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} ],
		[ {terrain:FLOOR.WAT} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} ],
		[ {terrain:FLOOR.WAT} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} ],
		[ {terrain:FLOOR.WAT} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} , {terrain:FLOOR.EAR} ]
	] );

}