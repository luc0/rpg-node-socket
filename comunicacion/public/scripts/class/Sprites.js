var Sprites = function(){

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 3000 );
    this.renderer = new THREE.WebGLRenderer();

    /*
        sprites.initSprite( { "object" : being } )
    */
    this.initSprite = function( params ){
        var object = params.object;
        var objectSprite = object.sprite;

        objectSprite.texture = new THREE.ImageUtils.loadTexture(objectSprite.images);
        objectSprite.geometry = new THREE.PlaneGeometry(objectSprite.width, objectSprite.height);

        objectSprite.material = new THREE.MeshLambertMaterial( {
            map: objectSprite.texture,
            transparent:( object.type == "being" || object.type === "artifact" ),
            side:THREE.FrontSide
        });

        objectSprite.character = new THREE.Mesh( objectSprite.geometry, objectSprite.material );

        objectSprite.character.position.x = object.position.x * 10 - 30 * 10 / 2 + 5 ;
        objectSprite.character.position.z = object.position.y * 10 - 30 * 10 / 2 + 5 ;
        objectSprite.character.position.y = -145 + objectSprite.offsetHeight;
        objectSprite.character.rotation.x = objectSprite.rotation;

        this.scene.add( objectSprite.character );


    }


    this.renderer.setSize( window.innerWidth-100, window.innerHeight-100 );
    document.body.appendChild( this.renderer.domElement );

    this.omniLight = new THREE.AmbientLight(0x404040);
    this.scene.add(this.omniLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
    this.directionalLight.position.set(1,1,1).normalize();
    this.scene.add(this.directionalLight);

    this.spotLight = new THREE.SpotLight(0xffffff,0.3);

    this.spotLight.position.set(1,1,1).normalize();
    this.scene.add(this.spotLight);

    this.camera.position.z = 800;
    this.camera.position.y = -40;

    var actualObject;

    this.render = render;
        var a=0;
    function render() {
        requestAnimationFrame( render );

        sprites.spotLight.position.x = sprites.camera.position.x;
        sprites.spotLight.position.y = sprites.camera.position.y;
        sprites.spotLight.position.z = sprites.camera.position.z;
        for( var object in world.createdObjects ){
            if( world.createdObjects[ object ].sprite.hasToCalculatePosition ){

                console.log("nueva posicion");
                actualObject = world.createdObjects[ object ];
                actualObject.sprite.hasToCalculatePosition = false;
                if( actualObject.sprite.character == undefined ) continue;
                actualObject.sprite.character.position.x = actualObject.position.x * 10 - 150 + 5;
                actualObject.sprite.character.position.z = actualObject.position.y * 10 - 150 + 5 ;
                if(actualObject.id == client.userId){
                    sprites.camera.position.z = actualObject.sprite.character.position.z+140;
                    sprites.camera.position.x = actualObject.sprite.character.position.x;
                    sprites.camera.lookAt( world.createdObjects[client.userId].sprite.character.position );
                }

            }
        }
        sprites.renderer.render( sprites.scene, sprites.camera );

    }

    this.preloadImages = function(){
        var textureLoader = new THREE.TextureLoader();
        textureLoader.load('public/sprites/elfo-down.png');
        textureLoader.load('public/sprites/aguila-down.png');
        textureLoader.load('public/sprites/agua.jpg');
        textureLoader.load('public/sprites/pasto.jpg');
    }

    this.preloadImages();

}
