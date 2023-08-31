// Function to generate maps (occlusion, specular, and displacement)
function generateMaps(imageSource) {
    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 2;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(400, 400);

        const canvasContainer = document.getElementById('canvas-container');
        canvasContainer.innerHTML = '';
        canvasContainer.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            imageSource,
            (texture) => {
                const material = new THREE.MeshBasicMaterial({ map: texture });
                const geometry = new THREE.PlaneGeometry(1, 1);
                const mesh = new THREE.Mesh(geometry, material);

                scene.add(mesh);

                const animate = () => {
                    requestAnimationFrame(animate);
                    renderer.render(scene, camera);
                };

                animate();
            },
            undefined,
            (error) => {
                console.error('Error loading texture:', error);
            }
        );
    } catch (error) {
        console.error('Error in generateMaps:', error);
    }
}

// Event listener for file input
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            // Generate maps with the loaded image
            generateMaps(e.target.result);
        };

        reader.readAsDataURL(file);
    }
});
