import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PhotoGallery.css';

interface Photo {
  id: number;
  src: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  displayWidth?: number;
  displayHeight?: number;
}

interface MasonryColumn {
  photos: Photo[];
  height: number;
}

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Initialize photos
  useEffect(() => {
    const photoData: Photo[] = Array.from({ length: 70 }, (_, i) => ({
      id: i + 1,
      src: `/assets/images/pht/pht (${i + 1}).jpeg`,
      aspectRatio: 1.5,
      displayWidth: 300,
      displayHeight: 200
    }));
    
    setPhotos(photoData);
  }, []);

  // Handle image load to get dimensions
  const handleImageLoad = (id: number, naturalWidth: number, naturalHeight: number) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === id 
        ? { 
            ...photo, 
            width: naturalWidth, 
            height: naturalHeight, 
            aspectRatio: naturalWidth / naturalHeight 
          }
        : photo
    ));
    setLoadedImages(prev => new Set(prev).add(id));
  };

  // Create masonry layout
  const createMasonryLayout = (photos: Photo[], columnCount: number = 3): MasonryColumn[] => {
    const columns: MasonryColumn[] = Array.from({ length: columnCount }, () => ({
      photos: [],
      height: 0
    }));

    photos.forEach((photo) => {
      const shortestColumn = columns.reduce((min, col) => 
        col.height < min.height ? col : min
      );
      
      const baseWidth = 280;
      let adaptiveWidth = baseWidth;
      
      if (photo.aspectRatio && photo.aspectRatio > 2) {
        adaptiveWidth = baseWidth * 0.85;
      } else if (photo.aspectRatio && photo.aspectRatio < 0.6) {
        adaptiveWidth = baseWidth * 1.15;
      }
      
      const photoHeight = adaptiveWidth / (photo.aspectRatio || 1.5);
      
      shortestColumn.photos.push({
        ...photo,
        displayWidth: adaptiveWidth,
        displayHeight: photoHeight
      });
      shortestColumn.height += photoHeight + 24;
    });

    return columns;
  };

  const masonryColumns = createMasonryLayout(photos);

  return (
    <div className="photo-gallery">
      <motion.div 
        className="gallery-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="gallery-title">Photo Gallery</h1>
        <p className="gallery-subtitle">A collection of memories</p>
      </motion.div>

      <div className="masonry-container">
        {masonryColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="masonry-column">
            {column.photos.map((photo, photoIndex) => (
              <motion.div
                key={photo.id}
                className="photo-frame"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: columnIndex * 0.2 + photoIndex * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedPhoto(photo)}
                style={{
                  width: `${photo.displayWidth}px`,
                  height: `${photo.displayHeight}px`,
                  marginBottom: '24px'
                }}
              >
                {!loadedImages.has(photo.id) && (
                  <div className="loading-placeholder">
                    <div className="spinner" />
                  </div>
                )}
                
                <img
                  src={photo.src}
                  alt={`Photo ${photo.id}`}
                  className="photo-image"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    handleImageLoad(photo.id, img.naturalWidth, img.naturalHeight);
                  }}
                  style={{ 
                    opacity: loadedImages.has(photo.id) ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out'
                  }}
                />
                
                <div className="photo-number">
                  {String(photo.id).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={`Photo ${selectedPhoto.id}`}
                className="lightbox-image"
              />
              <div className="lightbox-number">
                Frame {String(selectedPhoto.id).padStart(2, '0')}
              </div>
              <button 
                className="close-button"
                onClick={() => setSelectedPhoto(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;
