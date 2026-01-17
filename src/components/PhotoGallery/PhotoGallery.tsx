import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VinylPlayer from './VinylPlayer';
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

  const accentColors = [
    'rgba(235, 30, 125, 0.35)',
    'rgba(155, 89, 182, 0.32)',
    'rgba(46, 204, 113, 0.28)',
    'rgba(243, 156, 18, 0.30)',
  ];

  const getAccentForPhoto = (id: number) => accentColors[(id - 1) % accentColors.length];

  // Initialize photos with correct naming convention
  useEffect(() => {
    const photoData: Photo[] = Array.from({ length: 69 }, (_, i) => ({
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

  // Create masonry layout with adaptive sizing
  const createMasonryLayout = (photos: Photo[], columnCount: number = 3): MasonryColumn[] => {
    const columns: MasonryColumn[] = Array.from({ length: columnCount }, () => ({
      photos: [],
      height: 0
    }));

    photos.forEach((photo) => {
      // Find shortest column
      const shortestColumn = columns.reduce((min, col) => 
        col.height < min.height ? col : min
      );
      
      // Calculate adaptive width based on aspect ratio
      const baseWidth = 320;
      let adaptiveWidth = baseWidth;
      
      // Adjust width for very wide or very tall images
      if (photo.aspectRatio && photo.aspectRatio > 2) {
        adaptiveWidth = baseWidth * 0.85;
      } else if (photo.aspectRatio && photo.aspectRatio < 0.6) {
        adaptiveWidth = baseWidth * 1.15;
      }
      
      // Calculate height based on adaptive width and aspect ratio
      const photoHeight = adaptiveWidth / (photo.aspectRatio || 1.5);
      
      shortestColumn.photos.push({
        ...photo,
        displayWidth: adaptiveWidth,
        displayHeight: photoHeight
      });
      shortestColumn.height += photoHeight + 90; // Increased for larger Polaroid bottom border
    });

    return columns;
  };

  const masonryColumns = createMasonryLayout(photos);

  return (
    <div className="vintage-gallery">
      {/* Vinyl Player */}
      <VinylPlayer />
      
      {/* Gallery Header */}
      <motion.div 
        className="vintage-header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 className="vintage-title">Cherished Memories</h1>
        <p className="vintage-subtitle">A collection of timeless moments</p>
        <div className="film-strip" />
      </motion.div>

      {/* Masonry Gallery */}
      <div className="masonry-container">
        {masonryColumns.map((column, columnIndex) => (
          <div 
            key={columnIndex}
            className="masonry-column"
          >
            {column.photos.map((photo, photoIndex) => (
              <motion.div
                key={photo.id}
                className="vintage-frame"
                initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: columnIndex * 0.15 + photoIndex * 0.08,
                  ease: "easeOut"
                }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  rotate: 1,
                  transition: { 
                    duration: 0.6, 
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
                onClick={() => setSelectedPhoto(photo)}
                style={{
                  width: `${photo.displayWidth}px`,
                  height: `${photo.displayHeight}px`,
                  ['--accent' as any]: getAccentForPhoto(photo.id)
                } as React.CSSProperties}
              >
                {/* Vintage Frame Structure */}
                <div className="vintage-frame-border">
                  <div className="vintage-frame-inner">
                    <div className="vintage-paper-texture">
                      {/* Loading placeholder */}
                      {!loadedImages.has(photo.id) && (
                        <div className="vintage-placeholder">
                          <div className="loading-spinner" />
                        </div>
                      )}
                      
                      {/* Actual Image */}
                      <img
                        src={photo.src}
                        alt={`Vintage memory ${photo.id}`}
                        className="vintage-image"
                        onLoad={(e) => {
                          const img = e.target as HTMLImageElement;
                          handleImageLoad(photo.id, img.naturalWidth, img.naturalHeight);
                        }}
                        style={{ 
                          opacity: loadedImages.has(photo.id) ? 1 : 0,
                          transition: 'opacity 1s ease-in-out'
                        }}
                      />
                      
                      {/* Hover Effects */}
                      <div className="vintage-hover-effects">
                        <div className="warm-glow" />
                        <div className="sparkle-shimmer" />
                        <div className="dust-particles">
                          {[...Array(6)].map((_, i) => (
                            <div 
                              key={i} 
                              className="dust-particle"
                            />
                          ))}
                        </div>
                        <div className="vignette-fade" />
                      </div>
                      
                      {/* Photo Number */}
                      <div className="photo-number">
                        {String(photo.id).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Vintage Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="vintage-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="vintage-lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.4, 0, 0.2, 1],
                type: "spring",
                stiffness: 200,
                damping: 25
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="vintage-lightbox-frame">
                <img
                  src={selectedPhoto.src}
                  alt={`Vintage memory ${selectedPhoto.id}`}
                  className="vintage-lightbox-image"
                />
                <div className="lightbox-photo-number">
                  Frame {String(selectedPhoto.id).padStart(2, '0')}
                </div>
                <button 
                  className="vintage-close-button"
                  onClick={() => setSelectedPhoto(null)}
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;
