// Function to display an image in a canvas
function displayImage(imageSource) {
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = imageSource;

    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
    };
}

// Event listener for file input
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            // Display the loaded image in the canvas
            displayImage(e.target.result);
        };

        reader.readAsDataURL(file);
    }
});
