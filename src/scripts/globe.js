import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CONSTANTS = {
    WIDTH: 640,
    HEIGHT: 490
}

export default class Globe {
    constructor(canvas) {
        // Set Up
        const scene = new THREE.Scene(); // where objects will be placed
        const camera = new THREE.PerspectiveCamera(105, CONSTANTS.WIDTH / CONSTANTS.HEIGHT, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true }); // displays the globe, puts into existence the objects we want
        renderer.setSize(CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Create Globe
        const globeMap =new THREE.TextureLoader().load("src/images/earthmap.jpeg");
        const globeBumpMap = new THREE.TextureLoader().load("src/images/earthbump.jpeg");
        const globeSpecularMap = new THREE.TextureLoader().load("src/images/earthspec.jpeg");
        
        const globeGeometry = new THREE.SphereGeometry(13, 50, 50); // radius = 13
        const globeMaterial = new THREE.MeshPhongMaterial({
            map: globeMap, 
            bumpMap: globeBumpMap,
            bumpScale: 0.05,
            specularMap: globeSpecularMap,
            specular: new THREE.Color('grey')
        });
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        scene.add(globe);

        camera.position.z = 18;

        // Create Clouds
        const cloudGeometry = new THREE.SphereGeometry(13, 50, 50);
        const cloudTexture = new THREE.TextureLoader().load("src/images/earthclouds.jpeg");
        const cloudMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff, 
            map: cloudTexture,
            transparent: true,
            opacity: 0.5
        });
        const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
        clouds.scale.set(1.015, 1.015, 1.015); // putting clouds on top of the globe
        globe.add(clouds);

        // Add Lights
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x0061C1, 0.5, 0);
        pointLight1.position.set(150, 0, -150);

        const pointLight2 = new THREE.PointLight(0x0061C1, 0.5, 0);
        pointLight2.position.set(150, 150, 150);

        const pointLight3 = new THREE.PointLight(0x0061C1, 0.7, 0);
        pointLight3.position.set(-150, -150, 50);

        scene.add(pointLight1, pointLight2, pointLight3);

        // Add Background Stars
        const starGeometry = new THREE.SphereGeometry(20, 60, 60); // values have to be bigger than globe
        const starTexture = new THREE.TextureLoader().load("src/images/galaxy-jpg.jpg");
        const starMaterial = new THREE.MeshBasicMaterial({
            map: starTexture,
            side: THREE.BackSide
        });

        const starBackground = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(starBackground);

        // Create Controls
        const controls = new OrbitControls(camera, canvas);

        // Restrict zoom distance
        controls.minDistance = 15;
        controls.maxDistance = 24;
        controls.enablePan = false;
        controls.update()
        controls.saveState();


        // Functions 

        function animate() {
            requestAnimationFrame( animate );
            controls.update();
            globe.rotation.y += 0.0005;
            renderer.render( scene, camera );
        }
        animate();

    }
}

