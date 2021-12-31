import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CONSTANTS = {
    WIDTH: 640,
    HEIGHT: 720
}

export default class Globe {
    constructor(canvas) {
        // Set Up
        const scene = new THREE.Scene(); // where objects will be placed
        const camera = new THREE.PerspectiveCamera(80, CONSTANTS.WIDTH / CONSTANTS.HEIGHT, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true }); // displays the globe, puts into existence the objects we want
        renderer.setSize(CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Create Globe
        const globeMap =new THREE.TextureLoader().load("src/images/earthmap.jpeg");
        const globeBumpMap = new THREE.TextureLoader().load("src/images/earthbump.jpeg");
        const globeSpecularMap = new THREE.TextureLoader().load("src/images/earthspec.jpeg");
        
        const globeGeometry = new THREE.SphereGeometry(10, 32, 32); // radius = 10
        const globeMaterial = new THREE.MeshPhongMaterial({
            map: globeMap, 
            bumpMap: globeBumpMap,
            bumpScale: 0.10,
            specularMap: globeSpecularMap,
            specular: new THREE.Color('grey')
        })
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);

        // Create Lights
        const lights = [];

        // Create Clouds


        // Add Globe to Scene
        scene.add(globe);


        // // Create Controls
        const controls = new OrbitControls(camera, renderer.domElement);





        camera.position.z = 15;

        // Functions 

        function animate() {
            requestAnimationFrame( animate );
            controls.update();
            globe.rotation.y += 0.001;
            renderer.render( scene, camera );
        }
        animate();

    }
}

