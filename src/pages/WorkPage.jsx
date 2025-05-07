import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWorkData } from '../context/WorkContext';
import styles from './WorkPage.module.css'; // Import CSS module

function WorkPage() {
  const params = useParams();
  const { workBodies, homeImages, loading, error } = useWorkData(); 
  const [currentBody, setCurrentBody] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (loading || error || !workBodies) return; 
    let foundBody = null;
    if (params.workId) {
      foundBody = workBodies.find(b => b.id === params.workId);
    } else if (workBodies.length > 0) {
      foundBody = workBodies[0];
    }
    setCurrentBody(foundBody); 
    setCurrentIndex(0); 
  }, [params.workId, workBodies, loading, error]);

  const handleNext = () => {
    if (!currentBody) return;
    const imageCount = homeImages?.length || 0;
    const totalItems = 1 + imageCount; 
    if (totalItems <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const handlePrevious = () => {
    if (!currentBody) return;
    const imageCount = homeImages?.length || 0;
    const totalItems = 1 + imageCount;
    if (totalItems <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems); 
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentBody, homeImages]);

  // --- Render Logic --- 
  if (loading) {
    return <div>Loading data...</div>;
  }
  if (error) {
    return <div>Error loading data: {error}</div>;
  }
  if (!currentBody) {
    return <div>Work collection not found or no collections available.</div>;
  }

  let content;
  let imageSrc = null;
  let altText = '';
  const hasHomeImages = homeImages && homeImages.length > 0;

  if (currentIndex === 0) {
    imageSrc = hasHomeImages ? homeImages[0 % homeImages.length] : null;
    altText = `${currentBody.title} - Placeholder Image 1`;
  } else if (currentIndex === 1) {
    content = (
      <div className={styles.workDescription}>
        <h2>{currentBody.title}</h2>
        <p>{currentBody.description}</p>
      </div>
    );
  } else {
    const imageIndex = currentIndex - 1;
    imageSrc = hasHomeImages ? homeImages[imageIndex % homeImages.length] : null;
    altText = `${currentBody.title} - Placeholder Image ${imageIndex + 1}`;
  }

  if (currentIndex !== 1) {
    if (imageSrc) {
      content = (
        <img 
          src={imageSrc} 
          alt={altText} 
          className={styles.workImage}
        />
      );
    } else {
      content = <div>No placeholder images available.</div>
    }
  }

  return (
    <div className={styles.workPage}> {/* Apply page style */}
       {/* Apply clickable area style and handler */} 
      <div className={styles.clickableArea} onClick={handleNext}>
        {content}
      </div>
    </div>
  );
}

export default WorkPage;
