import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CONSTANTS = {
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight
}

export default class Globe {
    constructor(canvas) {
        // Set Up
        const scene = new THREE.Scene(); // where objects will be placed
        const camera = new THREE.PerspectiveCamera(80, CONSTANTS.WIDTH / CONSTANTS.HEIGHT, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true }); // displays the globe, puts into existence the objects we want
        renderer.setSize(CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Create Controls
        const controls = new OrbitControls(camera, canvas);

        // Create Globe

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        animate();

    }
}

