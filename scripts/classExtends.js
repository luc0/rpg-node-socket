
//classExtends.js
classExtends = function (child,parent){
	prototypeExtends = new parent();	
	for(p in prototypeExtends)
	{
		child[p]=prototypeExtends[p]
	}
}