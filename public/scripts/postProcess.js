// Applies post-processing effects & filters
function applyPostProcess() {
  const finalImage = new Image();

  container.appendChild(postProcessLayer);

  // Slow down the request using the cache buster to ensure the video has time to stop (this is a hack)
  finalImage.src = p5Canvas.toDataURL();
  finalImage.onload = () => {

    // ppContext.canvas.width = image.naturalWidth;
    // ppContext.canvas.height = image.naturalHeight;

    ppContext.drawImage(finalImage, 0, 0);
    const imageData = ppContext.getImageData(0, 0, ppContext.canvas.width, ppContext.canvas.height);
    const data = imageData.data; // RGBA

    for (let i = chromaticAberrationPhase % 4; i < data.length; i += 4) {
      // Setting the start of the loop to a different integer will change the aberration color, but a start integer of 4n-1 will not work
      data[i] = data[i + 4 * chromaticAberrationStrength];
    }
    
    ppContext.putImageData(imageData, 0, 0);
  };
}