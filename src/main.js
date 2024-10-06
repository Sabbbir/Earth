// src/main.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Import shaders
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';
import ozoneVertexShader from './shaders/ozoneVertex.glsl';
import ozoneFragmentShader from './shaders/ozoneFragment.glsl';

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1); // Black background
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);
camera.position.set(0, 0, 30);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
scene.add(hemisphereLight);

// Create Earth
const earthGeometry = new THREE.SphereGeometry(5, 50, 50);
const earthTexture = new THREE.TextureLoader().load('/assets/earth.jpg'); // Default texture
const earthMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        globeTexture: {
            value: earthTexture
        }
    }
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Create Atmosphere
const atmosphereGeometry = new THREE.SphereGeometry(5, 50, 50);
const atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
});
const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);

// Create Ozone Layer
const ozoneGeometry = new THREE.SphereGeometry(5, 50, 50);
const ozoneMaterial = new THREE.ShaderMaterial({
    vertexShader: ozoneVertexShader,
    fragmentShader: ozoneFragmentShader,
    blending: THREE.AdditiveBlending,
    transparent: true,
    uniforms: {
        strength: { value: 0.6 },
        threshold: { value: 0.01 }, // Set threshold to 0.01 as requested
    },
    side: THREE.BackSide,
});
const ozone = new THREE.Mesh(ozoneGeometry, ozoneMaterial);
ozone.scale.set(1.15, 1.15, 1.15);
scene.add(ozone);

// Create Stars
let stars; // To keep track of the current stars

// Function to create a circular texture for round stars
function createStarTexture() {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    // Draw a white circle
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = '#ffffff';
    context.fill();

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

const starTexture = createStarTexture();

// Function to create stars
function createStars(count) {
    if (stars) {
        scene.remove(stars);
        stars.geometry.dispose();
        stars.material.dispose();
    }

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5,
        map: starTexture, // Use the star texture
        transparent: true,
        alphaTest: 0.5,
        sizeAttenuation: true,
    });

    const starVertices = [];
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 4000;
        const y = (Math.random() - 0.5) * 4000;
        const z = (Math.random() - 0.5) * 4000;
        starVertices.push(x, y, z);
    }
    starGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(starVertices, 3)
    );
    stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

// Initialize stars with default count
createStars(10000);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.minDistance = 15;
controls.maxDistance = 250;
controls.autoRotate = false;
controls.autoRotateSpeed = 2.0;

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Rotation speed control
const speedControl = document.getElementById('speedControl');
let rotationSpeed = 0.003; 
let rotationDirection = 1; 

if (speedControl) {
    speedControl.addEventListener('input', (event) => {
        rotationSpeed = event.target.value / 1000;
    });
}

// Toggle section function
function toggleSection(button, section) {
    button.addEventListener('click', () => {
        const currentDisplay = getComputedStyle(section).display;
        section.style.display = currentDisplay === 'none' ? 'block' : 'none';
    });
}

// Handle Reverse Rotation Button
const reverseRotationBtn = document.getElementById('reverseRotationBtn');
reverseRotationBtn.addEventListener('click', () => {
    rotationDirection *= -1;
    reverseRotationBtn.textContent = rotationDirection === 1 ? 'Reverse Rotation' : 'Normal Rotation';
});

// Handle Auto Rotate Button
const autoRotateBtn = document.getElementById('autoRotateBtn');
autoRotateBtn.addEventListener('click', () => {
    controls.autoRotate = !controls.autoRotate;
    autoRotateBtn.textContent = controls.autoRotate ? 'Stop Auto Rotate' : 'Auto Rotate';
});

// Star Count Controls
const starCountBtn = document.getElementById('starCountBtn');
const starCountControls = document.getElementById('starCountControls');
toggleSection(starCountBtn, starCountControls);

const starCountSlider = document.getElementById('starCountSlider');
const starCountValue = document.getElementById('starCountValue');
starCountSlider.addEventListener('input', (event) => {
    const starCount = parseInt(event.target.value, 10);
    starCountValue.textContent = starCount.toLocaleString(); // Update display
    createStars(starCount);
});

// Switch Earth Texture Button Handler
const switchTextureBtn = document.getElementById('switchTextureBtn');
let isGreenEarth = false;
switchTextureBtn.addEventListener('click', () => {
    const texturePath = isGreenEarth ? '/assets/earth.jpg' : '/assets/green_earth.jpg';
    const newTexture = new THREE.TextureLoader().load(texturePath);
    earth.material.uniforms.globeTexture.value = newTexture;
    switchTextureBtn.textContent = isGreenEarth ? 'Switch to Green Earth' : 'Switch to Earth';
    isGreenEarth = !isGreenEarth;
});

// Ozone Controls
const ozoneControlBtn = document.getElementById('ozoneControlBtn');
const ozoneControlsContainer = document.getElementById('ozoneControlsContainer');
toggleSection(ozoneControlBtn, ozoneControlsContainer);

const ozoneRadiusSlider = document.getElementById('ozoneRadiusSlider');
const ozoneRadiusValue = document.getElementById('ozoneRadiusValue');
ozoneRadiusSlider.addEventListener('input', (event) => {
    const scale = parseFloat(event.target.value);
    ozone.scale.set(scale, scale, scale);
    ozoneRadiusValue.textContent = scale.toFixed(2);
});

const ozoneStrengthSlider = document.getElementById('ozoneStrengthSlider');
const ozoneStrengthValue = document.getElementById('ozoneStrengthValue');
ozoneStrengthSlider.addEventListener('input', (event) => {
    ozone.material.uniforms.strength.value = parseFloat(event.target.value);
    ozoneStrengthValue.textContent = ozone.material.uniforms.strength.value.toFixed(2);
});

// ISS Controls
const issControlBtn = document.getElementById('issControlBtn');
const issControlsContainer = document.getElementById('issControlsContainer');
toggleSection(issControlBtn, issControlsContainer);

let issOrbitSpeed = 0.01;
let issOrbitRadius = 7.0;
let issScale = 0.01;
const issPivot = new THREE.Object3D();
scene.add(issPivot);

const loaderGLTF = new GLTFLoader();
let iss; 

loaderGLTF.load('/assets/satellites/ISS_stationary.glb', (gltf) => {
    iss = gltf.scene;
    iss.scale.set(issScale, issScale, issScale);
    iss.position.set(issOrbitRadius, 0, 0);
    issPivot.add(iss);
});

const issOrbitSpeedSlider = document.getElementById('issOrbitSpeedSlider');
const issOrbitSpeedValue = document.getElementById('issOrbitSpeedValue');
issOrbitSpeedSlider.addEventListener('input', (event) => {
    issOrbitSpeed = parseFloat(event.target.value);
    issOrbitSpeedValue.textContent = issOrbitSpeed.toFixed(3);
});

const issOrbitRadiusSlider = document.getElementById('issOrbitRadiusSlider');
const issOrbitRadiusValue = document.getElementById('issOrbitRadiusValue');
issOrbitRadiusSlider.addEventListener('input', (event) => {
    issOrbitRadius = parseFloat(event.target.value);
    if (iss) iss.position.set(issOrbitRadius, 0, 0);
    issOrbitRadiusValue.textContent = issOrbitRadius.toFixed(2);
});

const issScaleSlider = document.getElementById('issScaleSlider');
const issScaleValue = document.getElementById('issScaleValue');
issScaleSlider.addEventListener('input', (event) => {
    issScale = parseFloat(event.target.value);
    if (iss) iss.scale.set(issScale, issScale, issScale);
    issScaleValue.textContent = issScale.toFixed(3);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += rotationSpeed * rotationDirection;
    atmosphere.rotation.y += rotationSpeed * 1.1 * rotationDirection;
    ozone.rotation.y += rotationSpeed * 1.2 * rotationDirection;
    issPivot.rotation.y += issOrbitSpeed;
    controls.update();
    renderer.render(scene, camera);
}

animate();
