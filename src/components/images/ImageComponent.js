import React, { useState, useEffect } from 'react';

const ImageComponent = () => {
    const [imageSrc, setImageSrc] = useState('');
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch('https://picsum.photos/200');
                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    setImageSrc(imageUrl);
                } else {
                    console.error('Failed to fetch image');
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        if (showImage) {
            fetchImage();
        } else {
            setImageSrc('');
        }

        // Clean up the URL object when the component is unmounted
        return () => URL.revokeObjectURL(imageSrc);
    }, [showImage]); // Dependency on showImage ensures the effect runs when showImage changes

    const handleButtonClick = () => {
        setShowImage(!showImage);
    };

    const handleCloseClick = () => {
        setShowImage(false);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>{showImage ? 'Close Image' : 'OK'}</button>
            {showImage && <img src={imageSrc} alt="Random Image" />}
        </div>
    );
};

export default ImageComponent;
