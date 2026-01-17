import React from 'react';
import './PhotoGallery.css';

const PhotoGallery: React.FC = () => {
  // Simple photo array
  const photos = Array.from({ length: 70 }, (_, i) => ({
    id: i + 1,
    src: `/assets/images/pht/pht (${i + 1}).jpeg`
  }));

  return (
    <div className="simple-gallery">
      <h1 className="gallery-title">Photo Gallery</h1>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img 
              src={photo.src} 
              alt={`Photo ${photo.id}`}
              className="photo-img"
            />
            <div className="photo-overlay">
              <span>{photo.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
