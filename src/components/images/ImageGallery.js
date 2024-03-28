import React, { useEffect, useState } from 'react';
import axios from 'axios';


// Voorbeeld: https://medium-com.translate.goog/@yahtzeemoomtaz/fetch-from-an-api-and-display-some-pictures-react-4de2a027eda7?_x_tr_sl=en&_x_tr_tl=nl&_x_tr_hl=nl&_x_tr_pto=sc&_x_tr_hist=true
const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await axios.get('http://localhost:8080/images');
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
        fetchImages();
    }, []);

    return (
        <div>
            <h2>Image Gallery</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', gap: '20px' }}>
                {images.map((image) => (
                    <div key={image.id} style={{ width: '300px', border: '1px solid #ccc', padding: '10px' }}>
                        <img src={image.imageUrl} alt={image.imageAltName} style={{ maxWidth: '100%' }} />
                        <p>Image Name: {image.imageName}</p>
                        <p>Alt Name: {image.imageAltName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
