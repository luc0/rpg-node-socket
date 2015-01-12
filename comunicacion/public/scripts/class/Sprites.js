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

        objectSprite.geometry = new THREE.PlaneGeometry(18, 23);
        objectSprite.texture = new THREE.ImageUtils.loadTexture(objectSprite.images);
        objectSprite.material = new THREE.MeshLambertMaterial( {
            map: objectSprite.texture,
            transparent:true,
            side:THREE.FrontSide
        });
        objectSprite.character = new THREE.Mesh( objectSprite.geometry, objectSprite.material );
        objectSprite.character.position.x = object.position.x * 10 - 30 * 10 / 2 + 5 ;
        objectSprite.character.position.z = object.position.y * 10 - 30 * 10 / 2 + 5 ;
        objectSprite.character.position.y = -150;
        objectSprite.character.rotation.x = -Math.PI / 2;
        this.scene.add( objectSprite.character );
        if( object.controls === "pc" ){
            camera.lookAt( objectSprite.character.position );

            this.spotLight.target.position.x = objectSprite.character.position.x;
            this.spotLight.target.position.y = objectSprite.character.position.y;
            this.spotLight.target.position.z = objectSprite.character.position.z;

            this.spotLight.target.updateMatrixWorld();
        }
    }


    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    this.omniLight = new THREE.AmbientLight(0x404040);
    scene.add(this.omniLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
    this.directionalLight.position.set(1,1,1).normalize();
    scene.add(this.directionalLight);

    this.spotLight = new THREE.SpotLight(0xffffff,0.3);

    this.spotLight.position.set(1,1,1).normalize();
    scene.add(this.spotLight);

    camera.position.z = 800;
    camera.position.y = 10;

    var actualObject;

    this.render = function() {

        requestAnimationFrame( render );
        renderer.render( this.scene, this.camera );

        this.camera.position.z = 200//100*Math.cos(cangulo)+200;
        this.camera.position.y = -50//50*Math.sin(cangulo*3)-99;
        this.camera.position.x = 20//100*Math.sin(cangulo);

        this.spotLight.position.x = this.camera.position.x;
        this.spotLight.position.y = this.camera.position.y;
        this.spotLight.position.z = this.camera.position.z;

        for( object in world.createdObjects ){
            if( world.createdObjects[ object ].sprite.hasToCalculatePosition ){
                actualObject = world.createdObjects[ object ];
                actualObject.sprite.hasToCalculatePosition = false;

                actualObject.sprite.character.position.x = actualObject.position.x * 10 - 150;
                actualObject.sprite.character.position.z = actualObject.position.y * 10 - 150 + 5;

            }
        }

    }

    this.render();

}
