(function() {
    "use strict";

    var SCREEN_WIDTH = window.innerWidth,
			SCREEN_HEIGHT = window.innerHeight,

			mouseX = 0, mouseY = 0,

			windowHalfX = window.innerWidth / 2,
			windowHalfY = window.innerHeight / 2,

			SEPARATION = 200,
			AMOUNTX = 10,
			AMOUNTY = 10,

			camera, Volk, renderer;

			init();
			animate();

			function init() {

				var container, separation = 100, amountX = 50, amountY = 50,
				particles, particle;

				var hero = document.getElementById("hero");
        var container = document.createElement("div");
        container.className = "hero__three-container";
        hero.appendChild( container );

				camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.z = 1000;

				Volk = new THREE.Volk();

				renderer = new THREE.CanvasRenderer({ alpha: true });
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				container.appendChild( renderer.domElement );

				// particles

				var PI2 = Math.PI * 2;
				var material = new THREE.SpriteCanvasMaterial( {

					color: 0xD9E1E9,
					program: function ( context ) {

						context.beginPath();
						context.arc( 0, 0, 0.5, 0, PI2, true );
						context.fill();

					}

				} );

				for ( var i = 0; i < 1000; i ++ ) {

					particle = new THREE.Sprite( material );
					particle.position.x = Math.random() * 2 - 1;
					particle.position.y = Math.random() * 2 - 1;
					particle.position.z = Math.random() * 2 - 1;
					particle.position.normalize();
					particle.position.multiplyScalar( Math.random() * 10 + 450 );
					particle.scale.multiplyScalar( 2 );
					Volk.add( particle );

				}

				// lines

				for (var i = 0; i < 300; i++) {

					var geometry = new THREE.Geometry();

					var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
					vertex.normalize();
					vertex.multiplyScalar( 450 );

					geometry.vertices.push( vertex );

					var vertex2 = vertex.clone();
					vertex2.multiplyScalar( Math.random() * 0.3 + 1 );

					geometry.vertices.push( vertex2 );

					var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xD9E1E9, opacity: Math.random() } ) );
					Volk.add( line );
				}

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function onDocumentMouseMove(event) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
				camera.lookAt( Volk.position );

				renderer.setClearColor( 0x000000, 0 );
				renderer.render( Volk, camera );

			}

})();
