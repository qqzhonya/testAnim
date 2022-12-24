// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
// 	75,
// 	window.innerWidth / window.innerHeight,
// 	0.01,
// 	1000
// );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);

// document.body.appendChild(renderer.domElement);

// const loader = new GLTFLoader();

// let obj;
// loader.load('../assets/images/content/models/safe-animation.gltf', function(gltf) {
// 	obj = gltf.scene;
// 	scene.add(gltf.scene);
// });

// const light = new THREE.HemisphereLight(0xFFF, 0x000, 2);
// scene.add(light);
// camera.position.set(0, 0, 10);
// function animate() {
// 	requestAnimationFrame(animate);
// 	renderer.render(scene, camera);
// 	animate();
// }
