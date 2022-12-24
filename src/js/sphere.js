import * as THREE from 'three';
import { AmbientLight, BoxGeometry, BufferGeometry, Color, DirectionalLight, DynamicDrawUsage, HemisphereLight, IcosahedronGeometry, InstancedMesh, Matrix4, Mesh, MeshDepthMaterial, MeshMatcapMaterial, MeshPhongMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, Points, PointsMaterial, RectAreaLight, Scene, SphereGeometry, Vector3 } from "three";

let container,
  	renderer,
  	scene,
  	camera,
  	mesh,
		material,
  	start = Date.now(),
  	fov = 30;

window.addEventListener( 'load', function() {

  // grab the container from the DOM
  container = document.getElementById( "container" );

  // create a scene
  scene = new THREE.Scene();

  // create a camera the size of the browser window
  // and place it 100 units away, looking towards the center of the scene
  camera = new THREE.PerspectiveCamera(
    fov,
    container.offsetWidth / container.offsetHeight,
    1,
    10000
  );
  camera.position.z = 100;

	const light = new DirectionalLight( 0xffffff, .6 );

	const width = 20;
	const height = 20;
	const intensity = 15;
	const rectLight = new RectAreaLight( 0xffffff, intensity,  width, height );
	rectLight.position.set( 25, 25, 25 );
	rectLight.lookAt( 0, 0, 0 );

	scene.add( rectLight )

  // create a wireframe material
  material = new THREE.MeshBasicMaterial( {
    color: 0xb7ff00,
    wireframe: true
  } );

  // create a sphere and assign the material
  mesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry( 20, 4 ),
    material
  );
  scene.add( mesh );

  // create the renderer and attach it to the DOM
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio( window.devicePixelRatio );

  container.appendChild( renderer.domElement );

  render();

} );

function render() {

  // let there be light
  renderer.render( scene, camera );
  requestAnimationFrame( render );

}
