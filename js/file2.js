let el = document.getElementById('canvas');

let scene, camera, renderer, particle;
function init() {
    scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xdddddd);

    // const texture = new THREE.TextureLoader().load( "models/Grass_Dark_Green.jpg" );
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.repeat.set( 4, 4 );

    camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
    camera.position.set(-window.innerWidth / 180,window.innerWidth / 2,1000);

    // camera.position.set(-window.innerWidth / x,window.innerWidth / 2,1000);
    // camera.position.set( 40, 2, 500 );

    // hlight = new THREE.AmbientLight (0xEEEEEE,1);
    // scene.add(hlight);
    // directionalLight.position.set(0,1,0);
    // directionalLight.castShadow = true;
    // var light = new THREE.HemisphereLight(0x00FFFF, 0xF00000, 1);

    // let modelMaterials = [
    //     new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load( 'models/Grass_Dark_Green.jpg'), side: THREE.DoubleSide } ),
    //     new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load( 'models/Blacktop_Old_01.jpg'), side: THREE.DoubleSide } ),
    //     new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load( 'models/Carrera_Marble.jpg'), side: THREE.DoubleSide } ),
    //     new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load( 'models/Metal_Corrugated_Shiny.jpg'), side: THREE.DoubleSide } ),
    //     new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader( ).load( 'models/Translucent_Glass_Sky_Reflection.jpg'), side: THREE.DoubleSide } )
    // ]

    var lights = [];
    lights[0] = new THREE.DirectionalLight( 0x49bcff, 1 );
    lights[0].position.set( 1, 0, 0 );
    lights[1] = new THREE.DirectionalLight( 0x11E8BB, 1 );
    lights[1].position.set( 0.75, 1, 0.5 );
    lights[2] = new THREE.DirectionalLight( 0x8200C9, 1 );
    lights[2].position.set( -0.75, -1, 0.5 );
    scene.add( lights[0] );
    scene.add( lights[1] );
    scene.add( lights[2] );

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor(0x000000, 0.0);

    el.appendChild(renderer.domElement);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();
    particle = new THREE.Object3D();
    model = new THREE.Object3D();
    scene.add(particle);

    // model = new THREE.MeshFaceMaterial(modelMaterials);


    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });
    var geometry = new THREE.TetrahedronGeometry(2, 0);

    for (var i = 0; i < 1000; i++) {
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(90 + (Math.random() * 700));
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        particle.add(mesh);
    }

    var mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    var mat2 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true,
        side: THREE.DoubleSide

    });
    particle.scale.set(2,2,2);
    let loader = new THREE.GLTFLoader();
    loader.load('./models/scene.gltf', function(gltf){
        model = gltf.scene.children[0];
        model.scale.set(30,30,30);
        var vector = new THREE.Vector3(-300, -150, 100)
        model.position.set(vector.x, vector.y, vector.z);
        scene.add(gltf.scene);
        animate();
    });
    window.addEventListener('resize', onWindowResize, false);

}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    // model.rotation.z -= 0.0010;
    // model.rotation.y += 0.0020;
    // model.rotation.x -= 0.0010;
    // car.rotation.y += 0.0020;
    particle.rotation.x += 0.0000;
    particle.rotation.y -= 0.0040;
    renderer.clear();
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}
init();
