import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

let container, camera, scene, renderer;

const SPRITE_URL = 'assets/images/general/sprite.png';
const SPEED = 0.00001;
const SPHERE_NUM = 75;
const SPRITE_SCALE_DEPTH = 5;

let mouseX = 0;
let mouseY = 0;

const group = new THREE.Group();

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// document.addEventListener( 'mousemove', onDocumentMouseMove );

init();
animate();

function init() {
	container = document.getElementById( 'container' );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( container.offsetWidth, container.offsetHeight );
	renderer.setPixelRatio( window.devicePixelRatio );

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 25, container.offsetWidth / container.offsetHeight, 1, 1000);
	camera.position.z = 1;

	const texture = textureLoader.load(SPRITE_URL)
	const material = new THREE.SpriteMaterial( { map: texture, color: 0xffffff } );

	createBalls(material);
	scene.add(group);

	container.appendChild( renderer.domElement );
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

function animate() {
	requestAnimationFrame( animate );

	render();
}

function render() {
	updateCamera();
	updateObjects();
	renderer.render( scene, camera );
}

function updateCamera () {
	camera.position.x += ( mouseX - camera.position.x ) * .01;
	camera.position.y += ( - mouseY - camera.position.y ) * .01;

	camera.lookAt( scene.position );
}

function updateObjects () {
	const timer = SPEED * Date.now();

	const sprites = group.children;

	for ( let i = 0; i < sprites.length; i++ ) {
		const sphere = sprites[i];
		sphere.position.x = 5 * Math.cos( timer + i );
		sphere.position.y = 5 * Math.sin( timer + i * 1.1 );

	}
}

function createBalls (material) {
	for ( let i = 0; i < SPHERE_NUM; i ++ ) {
		const sprite = new THREE.Sprite( material );

		const x = Math.random() * 10 - 5;
		const y = Math.random() * 10 - 5;
		const z = Math.random() * 10 - 5;

		sprite.position.set( x, y, z );
		sprite.position.multiplyScalar( Math.random() * SPRITE_SCALE_DEPTH + 1 );

		group.add( sprite );
	}
}
