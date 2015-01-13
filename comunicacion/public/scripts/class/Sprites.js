var Sprites = function(){

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 3000 );
    this.renderer = webglAvailable() ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
    this.time = new Date().getTime();
    this.textures = {};
    this.geometry = {};
    this.material = {};

    function webglAvailable() {
        try {
            var canvas = document.createElement("canvas");
            return !!
                window.WebGLRenderingContext &&
                (canvas.getContext("webgl") ||
                    canvas.getContext("experimental-webgl"));
        } catch(e) {
            return false;
        }
    }
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

            // Si las texturas y geometrias son las mismas que otras ya usadas, las reutiliza.
            if(this.textures[object.name] !== undefined){
                objectSprite.texture = this.textures[object.name];
                objectSprite.geometry = this.geometry[object.name];
                objectSprite.material = this.material[object.name];
            }else{
            //Si las texturas y geometrias son nuevas las crea.
                objectSprite.texture = new THREE.ImageUtils.loadTexture(objectSprite.images);
                objectSprite.geometry = new THREE.PlaneBufferGeometry(objectSprite.width, objectSprite.height);
                objectSprite.material = new THREE.MeshLambertMaterial( {
                    map: objectSprite.texture,
                    transparent:( object.type == "being" || object.type === "artifact" ),
                    side:THREE.FrontSide
                });
                this.textures[object.name] = objectSprite.texture;
                this.geometry[object.name] = objectSprite.geometry;
                this.material[object.name] = objectSprite.material;
            }


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
                    params.return.group = sprGroup;
                    sprite = sprGroup.getNewSprite("up",{position: new THREE.Vector3(params.position.x,params.position.y,params.position.z)});
                    params.return.character = sprite;

                    // Asigno posiciones
                    params.return.character.position.x = params.position.x;
                    params.return.character.position.y = params.position.y;
                    params.return.character.position.z = params.position.z;
                    params.return.character.rotation.x = params.rotation.x;

                    // Creo en el mapa
                    params.padre.add( params.return.character );
                }
            })(params);
        }
    }

    this.changeAnimation = function( params ){
        params.target.character.changeSprite( params.animation ,{position: new THREE.Vector3(0,0,0)});
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
