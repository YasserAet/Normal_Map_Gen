// Initialize a Three.js scene
const scene = new THREE.Scene();

// Initialize a Three.js renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(400, 400);

// Append the renderer to a container in your HTML
const canvasContainer = document.getElementById('canvas-container');
canvasContainer.innerHTML = ''; // Clear previous content
canvasContainer.appendChild(renderer.domElement);

// Create a camera
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 2;

// Load the image texture
const textureLoader = new THREE.TextureLoader();
let inputTexture;

// Create a material using the image texture
const material = new THREE.MeshBasicMaterial({ map: inputTexture });

// Create a geometry (e.g., a plane) to apply the material
const geometry = new THREE.PlaneGeometry(1, 1);
const mesh = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(mesh);

// Set up lights (you may need to adjust these for your specific needs)
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Initialize SSAO (Screen Space Ambient Occlusion) pass
const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

const ssaoPass = new THREE.SSAOPass(scene, camera, 1, 1); // Adjust parameters as needed
ssaoPass.renderToScreen = true;
composer.addPass(ssaoPass);

// Function to generate maps (occlusion, specular, and displacement)
function generateMaps() {
    composer.render(); // Render the scene

    // You can access the generated occlusion map from ssaoPass.renderTargetDepth.texture

    // You can use this occlusion map in your Three.js scene or save it as an image.
}

// Event listener for file input
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const image = new Image();
            image.src = e.target.result;

            image.onload = () => {
                // Set the loaded image as the input texture
                inputTexture = new THREE.Texture(image);
                inputTexture.needsUpdate = true;

                // Generate maps with the loaded image
                generateMaps();
            };
        };

        reader.readAsDataURL(file);
    }
});
