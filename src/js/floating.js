import * as THREE from 'three';
import { DebugEnvironment } from 'three/examples/jsm/environments/DebugEnvironment';

// import { AnaglyphEffect } from 'three/addons/effects/AnaglyphEffect.js';

let container, camera, scene, renderer, effect;

const spheres = [];

let mouseX = 0;
let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const params = {
  envMap: 'HDR',
  roughness: 0.0,
  metalness: 0.0,
  exposure: 1.0,
  debug: false
};

document.addEventListener( 'mousemove', onDocumentMouseMove );

init();
animate();

function init() {

	container = document.getElementById( 'container' );
	// document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 25, container.offsetWidth / container.offsetHeight, 1, 1000);
	camera.position.z = 1;

	const urls = 'assets/images/general/disc.png';
	// const format = '.png';

	scene = new THREE.Scene();
	// scene.background = textureCube;

	// const pmremGenerator = new THREE.PMREMGenerator( renderer );
	// pmremGenerator.compileCubemapShader();

	// const envScene = new DebugEnvironment();
	// generatedCubeRenderTarget = pmremGenerator.fromScene( envScene );

	const geometry = new THREE.SphereGeometry( 0.05, 32, 16 );
	const material = new THREE.MeshMatcapMaterial( {
    color: 0xF8421A,
		metalness: params.metalness,
		roughness: params.roughness,
  } );

	for ( let i = 0; i < 250; i ++ ) {

		const mesh = new THREE.Mesh( geometry, material );

		mesh.position.x = Math.random() * 10 - 5;
		mesh.position.y = Math.random() * 10 - 5;
		mesh.position.z = Math.random() * 10 - 5;

		mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

		scene.add( mesh );

		spheres.push( mesh );
	}

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );

	renderer.setSize( container.offsetWidth, container.offsetHeight );

	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

	windowHalfX = container.offsetWidth / 2;
	windowHalfY = container.offsetHeight / 2;

	camera.aspect = container.offsetWidth / container.offsetHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(container.offsetWidth, container.offsetHeight);

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX ) / 550;
	mouseY = ( event.clientY - windowHalfY ) / 550;

}

//

function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {

	const timer = 0.000005 * Date.now();

	camera.position.x += ( mouseX - camera.position.x ) * .01;
	camera.position.y += ( - mouseY - camera.position.y ) * .01;

	camera.lookAt( scene.position );

	for ( let i = 0, il = spheres.length; i < il; i ++ ) {

		const sphere = spheres[ i ];

		sphere.position.x = 5 * Math.cos( timer + i );
		sphere.position.y = 5 * Math.sin( timer + i * 1.1 );

	}

	renderer.render( scene, camera );

}
