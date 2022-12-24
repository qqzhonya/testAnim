import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { v4 as uuidv4 } from 'uuid';

let container,
		camera,
		renderer,
		scene,
		controls,
		duck,
		mixer;

const clock	= new THREE.Clock();

function init() {
	container = document.getElementById('container');

	scene = new THREE.Scene();

	const fov = 30;
	const aspect = container.clientWidth / container.clientHeight;
	const near = 0.1;
	const far = 800;

	// Camera
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 500, 0);
	controls = new OrbitControls(camera, container);
	controls.update();
	// controls.enableZoom = false;

	const ambient = new THREE.AmbientLight(0xfafafa, 2);
	scene.add(ambient);

	// Renderer
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	// Load model
	let loader = new GLTFLoader();
	loader.load('assets/images/content/models/safe-anim-new.glb', function(gltf) {
		const model = gltf.scene;

		scene.add(model);
		renderer.render(scene, camera);

		mixer = new THREE.AnimationMixer(model)
		mixer.clipAction(gltf.animations[0]).play();

		animate();
	});
}

function animate() {
	requestAnimationFrame(animate);

	const delta = clock.getDelta();

	mixer.update(delta);

	controls.update();

	renderer.render(scene, camera);
}

uuidv4();
init();
