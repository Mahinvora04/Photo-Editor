const upload = document.getElementById("upload");
const image = document.getElementById("image");
const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const grayscale = document.getElementById("grayscale");
const blur = document.getElementById("blur");
const resetBtn = document.getElementById("reset");
const downloadBtn = document.getElementById("download");
const uploadInput = document.getElementById("upload");

const rotate = document.getElementById("rotate");
const flipHorizontal = document.getElementById("flipHorizontal");
const flipVertical = document.getElementById("flipVertical");

let rotationValue = 0;
let scaleX = 1;
let scaleY = 1;

// Function to apply styles to the image
function updateImage() {
  const brightnessValue = brightness.value;
  const contrastValue = contrast.value;
  const grayscaleValue = grayscale.value;
  const blurValue = blur.value;

  image.style.filter = `brightness(${brightnessValue}%) contrast(${contrastValue}%) grayscale(${grayscaleValue}%) blur(${blurValue}px)`;
}

// Update the image whenever any of the sliders change
brightness.addEventListener("input", updateImage);
contrast.addEventListener("input", updateImage);
grayscale.addEventListener("input", updateImage);
blur.addEventListener("input", updateImage);

// Reset button to reset the filters
resetBtn.addEventListener("click", () => {
  brightness.value = 100;
  contrast.value = 100;
  grayscale.value = 0;
  blur.value = 0;
  updateImage();
});

// Download the edited image
downloadBtn.addEventListener("click", () => {
  // Create a canvas to draw the image and apply styles
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  // Apply styles to the image on the canvas
  ctx.filter = `brightness(${brightness.value}%) contrast(${contrast.value}%) grayscale(${grayscale.value}%) blur(${blur.value}px)`;
  ctx.drawImage(image, 0, 0);

  // Convert canvas to data URL (image format)
  const dataURL = canvas.toDataURL("image/png");

  // Create an anchor element to trigger the download
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = "edited-image.png"; // Specify the file name
  a.click(); // Trigger the download
});

// Load image onto the editor
upload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    image.src = reader.result;
    image.hidden = false; // Make the image visible
    updateImage(); // Apply initial filter values
  };
  reader.readAsDataURL(file);
});

// Show image and download button when a file is selected
uploadInput.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      image.src = e.target.result;
      image.hidden = false; // Show image
      downloadBtn.style.display = "block"; // Show the download button
    };

    reader.readAsDataURL(file);
  }
});

// Function to update styles (including rotate and flip)
function updateImage() {
  const brightnessValue = brightness.value;
  const contrastValue = contrast.value;
  const grayscaleValue = grayscale.value;
  const blurValue = blur.value;

  image.style.filter = `brightness(${brightnessValue}%) contrast(${contrastValue}%) grayscale(${grayscaleValue}%) blur(${blurValue}px)`;
  image.style.transform = `rotate(${rotationValue}deg) scale(${scaleX}, ${scaleY})`;
}

// Rotate the image
rotate.addEventListener("input", () => {
  rotationValue = rotate.value; // Get the rotation value from the range slider
  updateImage();
});

// Flip the image horizontally
flipHorizontal.addEventListener("click", () => {
  scaleX *= -1; // Toggle the horizontal scale between 1 and -1
  updateImage();
});

// Flip the image vertically
flipVertical.addEventListener("click", () => {
  scaleY *= -1; // Toggle the vertical scale between 1 and -1
  updateImage();
});

// Reset button to reset filters, rotation, and flipping
resetBtn.addEventListener("click", () => {
  brightness.value = 100;
  contrast.value = 100;
  grayscale.value = 0;
  blur.value = 0;
  rotate.value = 0;
  rotationValue = 0;
  scaleX = 1;
  scaleY = 1;
  updateImage();
});

// Update the canvas logic in the download functionality
downloadBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  // Apply transformations to the canvas
  ctx.filter = `brightness(${brightness.value}%) contrast(${contrast.value}%) grayscale(${grayscale.value}%) blur(${blur.value}px)`;
  ctx.translate(canvas.width / 2, canvas.height / 2); // Move to center for rotation
  ctx.rotate((rotationValue * Math.PI) / 180); // Rotate image
  ctx.scale(scaleX, scaleY); // Apply flipping
  ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);

  const dataURL = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = "edited-image.png";
  a.click();
});
