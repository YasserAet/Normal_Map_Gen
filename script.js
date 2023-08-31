// Ensure you have Three.js included in your HTML file
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js"></script>

// Function to generate maps (occlusion, specular, and displacement)
function generateMaps(inputImage) {
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
    const texture = textureLoader.load(inputImage);

    // Create a material using the image texture
    const material = new THREE.MeshBasicMaterial({ map: texture });

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

    // Render the scene
    const animate = () => {
        requestAnimationFrame(animate);

        // You can add animation or interaction here

        renderer.render(scene, camera);
    };

    animate();

    // You can perform additional map generation here, e.g., using shaders and framebuffers
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
                // Generate maps with the loaded image
                generateMaps(image.src);
            };
        };

        reader.readAsDataURL(file);
    }
});
