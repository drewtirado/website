import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css'; // Import CSS module

// Utility function to get random images
const getRandomImages = (images, count, exclude = []) => {
  if (!images || images.length === 0) {
    return [];
  }
  // Filter out excluded images
  const availableImages = images.filter(img => !exclude.includes(img));
  
  // Shuffle the available images (Fisher-Yates shuffle)
  const shuffled = [...availableImages];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return the requested number of images
  return shuffled.slice(0, count);
};

function HomePage() {
  const [allImages, setAllImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);

  useEffect(() => {
    fetch('/data/homeImages.json') // Path relative to public folder
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched images:", data); // Log fetched data
        setAllImages(data);
        // --- Select initial images ---
        const initialImages = getRandomImages(data, 2);
        setDisplayedImages(initialImages);
        // ---------------------------
      })
      .catch(error => {
        console.error("Error fetching home images:", error);
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  // Click handler implementation
  const handleImageClick = (clickedImage) => {
    console.log("Attempting to replace:", clickedImage);
    // Get one new image, excluding the ones currently displayed
    const newImageArr = getRandomImages(allImages, 1, displayedImages);

    if (newImageArr.length > 0) {
      const newImage = newImageArr[0];
      console.log("Replacing with:", newImage);
      // Update the state, replacing only the clicked image
      setDisplayedImages(currentImages => 
        currentImages.map(img => (img === clickedImage ? newImage : img))
      );
    } else {
      console.log("No available images to replace with.");
      // Optionally provide user feedback if no images are left
    }
  };

  return (
    <div className={styles.homePage}> {/* Apply CSS module class */}
      {/* --- Render displayed images --- */}
      <div className={styles.imageContainer}> {/* Apply CSS module class */}
        {displayedImages.length > 0 ? (
          displayedImages.map((imagePath, index) => (
            <img 
              key={index} // Using index as key for simplicity, consider unique IDs if available
              src={imagePath} 
              alt={`Portfolio image ${index + 1}`}
              onClick={() => handleImageClick(imagePath)} // Ensure handler is attached
              className={styles.homeImage} // Apply CSS module class
            />
          ))
        ) : (
          <p>Loading images...</p>
        )}
      </div>
      {/* --------------------------- */}
    </div>
  );
}

export default HomePage; 