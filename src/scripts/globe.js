import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import getData from "./data.js";
import { createChart } from "./chart.js"

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
        clouds.scale.set(1.005, 1.005, 1.005); // clouds layer is slightly bigger than globe
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
        const starGeometry = new THREE.SphereGeometry(25, 60, 60); // values have to be bigger than globe
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

        function findCountryPosition(globe, country, province, latitude, longitude) {
            let countryGeometry = new THREE.SphereGeometry(0.1, 50, 50); // radius of 0.1
            let countryMaterial = new THREE.MeshBasicMaterial({
                color: 0xFFFF00 
            });
            let countryDot = new THREE.Mesh(countryGeometry, countryMaterial);

            let countryLatitude = latitude * (Math.PI / 180); // convert latitude to radians
            let countryLongitude = (-longitude) * (Math.PI / 180); // convert longitude to radians
            let globeRadius = 13;

            // Convert Cartesian to Spherical Coordinates
            let positionX = globeRadius * Math.cos(countryLongitude) * Math.cos(countryLatitude);
            let positionY = globeRadius * Math.sin(countryLatitude);
            let positionZ = globeRadius * Math.cos(countryLatitude) * Math.sin(countryLongitude);

            countryDot.position.set(positionX, positionY, positionZ);
            countryDot.rotation.set(0, -countryLongitude, countryLatitude - (Math.PI * 0.5));

            countryDot.userData.country = country;
            countryDot.userData.provinceState = province;

            clouds.add(countryDot);
        };

        async function addCountries() {
            let finalData = await getData();
            finalData = finalData.slice(1);

            for (let i = 0; i < finalData.length; i++) {
                let province = finalData[i];
                let countryArray = province[0];
                let country = countryArray[countryArray.length - 1][1];
                let provinceState = countryArray[countryArray.length - 1][0];            

                let coordinates = province[1];
                let latitude = coordinates[coordinates.length - 1][0];
                let longitude = coordinates[coordinates.length - 1][1];

                findCountryPosition(globe, country, provinceState, latitude, longitude);
            };
        };

        // Raycaster 
        const mouse = new THREE.Vector2(); // holds our mouse coordinates
        const raycaster = new THREE.Raycaster();

        function resetCountry() {
            for (let i = 0; i < clouds.children.length; i++) {
                let countryDot = clouds.children[i];
                if (countryDot.material) {
                    countryDot.material.color = new THREE.Color(0xFFFF00);
                }
                countryDot.scale.set(1.0, 1.0);

                let globeDiv = document.getElementById("globe-canvas")
                globeDiv.style.cursor = "default";
            }
        }

        function hoverCountry() {
            raycaster.setFromCamera(mouse, camera);
            let intersects = raycaster.intersectObjects(clouds.children);
            for (let i = 0; i < intersects.length; i++) {
                let hoveredCountry = intersects[0].object;
                hoveredCountry.material.color = new THREE.Color(0xFF0000);
                hoveredCountry.scale.set(1.5, 1.5);

                let globeDiv = document.getElementById("globe-canvas")
                globeDiv.style.cursor = "pointer";

                
                // if (hoveredCountry.userData.country === ) {

                // }

                updatedMousePosition = intersects[0].point;
                
                // // if (!updatedMousePosition) {
                // //     hideTooltip();
                // // }

                if (updatedMousePosition) {
                    showTooltip(hoveredCountry);
                }
            }
        }

        let updatedMousePosition = undefined; // most updated projection of the mouse on the country dot (the intersection with raycaster)

        function showTooltip(hoveredCountry) {
            let tooltipDiv = document.getElementById("tooltip");
        
            if (tooltipDiv && updatedMousePosition) {
                tooltipDiv.style.display = "block"
            }
        
            let halfCanvasWidth = renderer.domElement.offsetWidth / 2;
            let halfCanvasHeight = renderer.domElement.offsetHeight / 2;
        
            let tooltipPosition = updatedMousePosition.clone().project(camera);
                
            tooltipPosition.x = (tooltipPosition.x * halfCanvasWidth) + halfCanvasWidth + renderer.domElement.offsetLeft;
            tooltipPosition.y = - (tooltipPosition.y * halfCanvasHeight) + halfCanvasHeight + renderer.domElement.offsetTop;
    
            let tootipWidth = tooltipDiv.offsetWidth;
            let tootipHeight = tooltipDiv.offsetHeight;
    
            tooltipDiv.style.left = (tooltipPosition.x - (tootipWidth / 2)) + "px";
            tooltipDiv.style.top = (tooltipPosition.y - tootipHeight - 5)+ "px";

            if (hoveredCountry.userData.provinceState == "") {
                tooltipDiv.innerText = hoveredCountry.userData.country;
            } else {
                tooltipDiv.innerText = hoveredCountry.userData.provinceState + ", " + hoveredCountry.userData.country;
            }

            tooltipDiv.style.opacity = "1.0"
        }

        function hideTooltip() {
            let tooltipDiv = document.getElementById("tooltip");
            if (tooltipDiv) {
                tooltipDiv.style.display = "none"
            }
        }



        function onMouseMove(e) { // calculates mouse position to be between -1 and 1
            let domRect = renderer.domElement.getBoundingClientRect(); 
            mouse.x = ((e.clientX - domRect.left) / (domRect.right - domRect.left)) * 2 - 1;
            mouse.y = -((e.clientY - domRect.top) / (domRect.bottom - domRect.top)) * 2 + 1;
        }
        
        window.addEventListener("mousemove", onMouseMove, false);


        // Display chart for clicked on country
        function onClick(e) {
            let domRect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((e.clientX - domRect.left) / (domRect.right - domRect.left)) * 2 - 1;
            mouse.y = -((e.clientY - domRect.top) / (domRect.bottom - domRect.top)) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            let intersects = raycaster.intersectObjects(clouds.children);
            for (let i = 0; i < intersects.length; i++) {

                let country = intersects[0].object.userData.country;
                let province = intersects[0].object.userData.provinceState;

                const ctx = document.getElementById("chart").getContext("2d");
            
                createChart(ctx, country, province);

                let lineGraphContainer = document.getElementById("line-graph");
                lineGraphContainer.classList.remove("line-graph-hidden");

                let instructionsBox = document.getElementById("instructions");
                instructionsBox.classList.add("instructions-box-hidden");     
                
            }
        }

        window.addEventListener("click", onClick, false);

        // Showing Countries
        let populateCountriesButton = document.getElementById("populate-countries-button");
        populateCountriesButton.addEventListener("click", (e) => {
            e.preventDefault()
            addCountries()
        });


        function animate() {
            controls.update();
            globe.rotation.y += 0.0005;
            resetCountry();
            hoverCountry();
            renderer.render( scene, camera );
            requestAnimationFrame( animate );
        }

        animate();
    }

}

