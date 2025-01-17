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

document.addEventListener("DOMContentLoaded", () => {
  const brightnessBtn = document.querySelector("button:nth-child(1)");
  const contrastBtn = document.querySelector("button:nth-child(2)");
  const grayscaleBtn = document.querySelector("button:nth-child(3)");
  const blurBtn = document.querySelector("button:nth-child(4)");
  const rotateBtn = document.querySelector("button:nth-child(5)");

  const brightnessControl = document.querySelector(
    ".control-group:nth-child(1)"
  );
  const contrastControl = document.querySelector(".control-group:nth-child(2)");
  const grayscaleControl = document.querySelector(
    ".control-group:nth-child(3)"
  );
  const blurControl = document.querySelector(".control-group:nth-child(4)");
  const rotateControl = document.querySelector(".control-group:nth-child(5)");

  const controlGroups = [
    brightnessControl,
    contrastControl,
    grayscaleControl,
    blurControl,
    rotateControl,
  ];

  const hideAllControls = () => {
    controlGroups.forEach((group) => {
      group.style.display = "none";
    });
  };

  const showControl = (control) => {
    hideAllControls();
    control.style.display = "block";
  };

  brightnessBtn.addEventListener("click", () => showControl(brightnessControl));
  contrastBtn.addEventListener("click", () => showControl(contrastControl));
  grayscaleBtn.addEventListener("click", () => showControl(grayscaleControl));
  blurBtn.addEventListener("click", () => showControl(blurControl));
  rotateBtn.addEventListener("click", () => showControl(rotateControl));

  // Initially hide all controls
  hideAllControls();
});

function updateImage() {
  const brightnessValue = brightness.value;
  const contrastValue = contrast.value;
  const grayscaleValue = grayscale.value;
  const blurValue = blur.value; 

  image.style.filter = `brightness(${brightnessValue}%) contrast(${contrastValue}%) grayscale(${grayscaleValue}%) blur(${blurValue}px)`;
  image.style.transform = `rotate(${rotationValue}deg) scale(${scaleX}, ${scaleY})`;
}

brightness.addEventListener("input", updateImage);
contrast.addEventListener("input", updateImage);
grayscale.addEventListener("input", updateImage);
blur.addEventListener("input", updateImage);

// Load image onto the editor
upload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    image.src = reader.result;
    image.hidden = false;
    updateImage();
  };
  reader.readAsDataURL(file);
});

// Rotate the image
rotate.addEventListener("input", () => {
  rotationValue = rotate.value; // Get the rotation value from the range slider
  updateImage();
});

// Flip the image horizontally
flipHorizontal.addEventListener("click", () => {
  scaleX *= -1;
  updateImage();
});

// Flip the image vertically
flipVertical.addEventListener("click", () => {
  scaleY *= -1;
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
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotationValue * Math.PI) / 180);
  ctx.scale(scaleX, scaleY);
  ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);

  const dataURL = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = "edited-image.png";
  a.click();
});

document.getElementById("add-watermark").addEventListener("click", () => {
  const text = document.getElementById("watermark-text").value;

  if (text) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    ctx.drawImage(image, 0, 0);

    ctx.font = "30px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height - 50);

    image.src = canvas.toDataURL("image/png");
  }
});

document.getElementById("resize").addEventListener("click", () => {
  const width = parseInt(document.getElementById("resize-width").value, 10);
  const height = parseInt(document.getElementById("resize-height").value, 10);

  if (width && height) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, width, height);

    image.src = canvas.toDataURL("image/png");
  }
});
