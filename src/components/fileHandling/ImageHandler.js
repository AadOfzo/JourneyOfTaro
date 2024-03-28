import React, { useEffect, useState } from "react";

function ImageHandler() {
    const [img, setImg] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch("http://localhost:8080/images"); // Fetch all images
                if (!response.ok) {
                    throw new Error("Failed to fetch images");
                }
                const data = await response.json(); // Parse response body as JSON
                // Assuming data is an array of image objects and you want to display the first image
                if (data.length > 0) {
                    const imageUrl = data[0].imageUrl; // Assuming the image object has an "imageUrl" property
                    setImg(imageUrl);
                } else {
                    throw new Error("No images available");
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };


        fetchImage();

        return () => {
            // Clean up object URL when component unmounts
            URL.revokeObjectURL(img);
        };
    }, []);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : img ? (
                <img src={img} alt="Uploaded" />
            ) : (
                <p>No image available</p>
            )}
        </>
    );
}

export default ImageHandler;
