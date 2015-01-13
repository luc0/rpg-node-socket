var Sprites = function(){

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 3000 );
    this.renderer = new THREE.WebGLRenderer();
    this.time = new Date().getTime();

    /*
        sprites.initSprite( { "object" : being } )
    */
    this.initSprite = function( params ){
        var object = params.object;
        var objectSprite = object.sprite;

        // Si tiene definida una Animacion.
        if( objectSprite.animation !== undefined ){

            this.animatedSprites({
                "target" : objectSprite ,
                "position" :  {
                    "x" : object.position.x * 10 - 30 * 10 / 2 + 5 ,
                    "z" : object.position.y * 10 - 30 * 10 / 2 + 12 ,
                    "y" : -145 + objectSprite.offsetHeight
                },
                "rotation" : {
                    "x" : 0//objectSprite.rotation
                }
            });

        }else{

        // Sino es una imagen estatica.

            objectSprite.texture = new THREE.ImageUtils.loadTexture(objectSprite.images);
            objectSprite.geometry = new THREE.PlaneBufferGeometry(objectSprite.width, objectSprite.height);
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


    }

    this.animatedSprites = function( params ){
        sprites.time = Date.now();

        console.log('dibuja',params.target);
        sprite( {
            'img' : params.target.images,
            'padre' : this.scene,
            'return' : params.target,
            'position' : params.position,
            'rotation' : params.rotation
        });


        function sprite( params ){

            var startImage = new Image();
            var sprite;
            startImage.src = params.img;
            startImage.onload = (function(params){
                return function(){
                    var sprGroup = new THREE.AnimatedSprites.SpritesGroup(startImage, {
                                    "sprites" : params.return.animation
                                }
                        );
                    sprite = sprGroup.getNewSprite("walk",{position: new THREE.Vector3(params.position.x,params.position.y,params.position.z)});
                    params.return.character = sprite;

                    // Asigno posiciones
                    sprite.position.x = params.position.x;
                    sprite.position.y = params.position.y;
                    sprite.position.z = params.position.z;
                    sprite.rotation.x = params.rotation.x;

                    // Creo en el mapa
                    params.padre.add( sprite );
                }
            })(params);
        }
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

    function render() {
        requestAnimationFrame( render );

        sprites.spotLight.position.x = sprites.camera.position.x;
        sprites.spotLight.position.y = sprites.camera.position.y;
        sprites.spotLight.position.z = sprites.camera.position.z;
        /*
        for( var object in world.createdObjects ){
            if( world.createdObjects[ object ].sprite.hasToCalculatePosition ){

                actualObject = world.createdObjects[ object ];
                if( actualObject.sprite.character == undefined ) continue;
                actualObject.sprite.hasToCalculatePosition = false;
                actualObject.sprite.character.position.x = actualObject.position.x * 10 - 150 + 5;
                actualObject.sprite.character.position.z = actualObject.position.y * 10 - 150 + 5 ;
                if(actualObject.id == client.userId){
                    sprites.camera.position.z = actualObject.sprite.character.position.z+140;
                    sprites.camera.position.x = actualObject.sprite.character.position.x;
                    sprites.camera.lookAt( world.createdObjects[client.userId].sprite.character.position );
                }

            }
        }
        */
        if(world.createdObjects[client.userId].sprite.character !== undefined){
            sprites.camera.position.z = world.createdObjects[client.userId].sprite.character.position.z+140;
            sprites.camera.position.x = world.createdObjects[client.userId].sprite.character.position.x;
            sprites.camera.lookAt( world.createdObjects[client.userId].sprite.character.position );
        }
        // Animacion sprite
        var delta = new Date().getTime() - sprites.time;
        THREE.AnimatedSprites.update(delta);
        //
        sprites.renderer.render( sprites.scene, sprites.camera );

        sprites.time = new Date().getTime();
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
