import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await axios.get(`http://localhost:8080/image/`);
                // Convert the object to an array
                const imagesArray = Object.values(response.data);
                setImages(imagesArray);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
        fetchImages();
    }, []);

    console.log('Images:', images);

    return (
        <div className="image-gallery-container">
            {console.log(images)}
            <h2>Image Gallery</h2>
            <table>
                <thead>
                <tr>
                    <td>Image ID</td>
                    <td>Image</td>
                    <td>Image Name</td>
                </tr>
                </thead>
                <tbody>
                {images.map(image => {
                    <div key={image.id}>
                        <h3>{image.imageName}</h3>
                        <img src={`data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, image.imageData))}`} alt={image.imageName} />
                    </div>
                })}
                </tbody>
            </table>

            {/*<ul>*/}
            {/*    {images.map((image) => (*/}
            {/*        <li key={image.id}>*/}
            {/*            <div>*/}
            {/*                <img*/}
            {/*                    src={`http://localhost:8080/images/${images}`}*/}
            {/*                    alt={image.imageName}*/}
            {/*                    style={{maxWidth: '100%', maxHeight: '200px'}}*/}
            {/*                />*/}
            {/*                <div>{image.imageName}</div>*/}
            {/*                <button onClick={() => handleDelete(image.id)}>Delete</button>*/}
            {/*            </div>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    );
};

export default ImageGallery;
