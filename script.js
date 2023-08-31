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

// Function to generate maps (occlusion, specular, and displacement)
function generateMaps() {
    // Create a renderer for off-screen rendering
    const mapRenderer = new THREE.WebGLRenderer();
    mapRenderer.setSize(400, 400);
    
    // Create render targets for each map
    const occlusionTarget = new THREE.WebGLRenderTarget(400, 400);
    const specularTarget = new THREE.WebGLRenderTarget(400, 400);
    const displacementTarget = new THREE.WebGLRenderTarget(400, 400);
    
    // Create custom shaders for each map (you'll need to write these shaders)
    const occlusionShader = createOcclusionShader();
    const specularShader = createSpecularShader();
    const displacementShader = createDisplacementShader();
    
    // Set the input texture for each shader
    occlusionShader.uniforms.inputTexture.value = inputTexture;
    specularShader.uniforms.inputTexture.value = inputTexture;
    displacementShader.uniforms.inputTexture.value = inputTexture;
    
    // Render the scene to generate maps
    mapRenderer.render(scene, camera, occlusionTarget);
    mapRenderer.render(scene, camera, specularTarget);
    mapRenderer.render(scene, camera, displacementTarget);
    
    // You can access the generated maps as textures from occlusionTarget.texture,
    // specularTarget.texture, and displacementTarget.texture.
    
    // You can then use these textures in your Three.js scene or save them as images.
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
