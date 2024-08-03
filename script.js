//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download and display images
function downloadAndDisplayImages(urls) {
  const imagePromises = urls.map(image => {
    return fetch(image.url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load image's URL: ${image.url}`);
        }
        return response.blob(); // Convert response to Blob
      })
      .then(blob => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob); // Create a URL for the Blob
        return img;
      });
  });

  Promise.all(imagePromises)
    .then(images => {
      output.innerHTML = ''; // Clear any previous images
      images.forEach(img => output.appendChild(img)); // Append each image
    })
    .catch(error => {
      console.error(error.message); // Log error message if any image fails to load
    });
}

// Add click event listener to the button
btn.addEventListener('click', () => {
  downloadAndDisplayImages(images);
});
