import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from "styled-components";

const ImageComponent = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem('token')

        console.log("token", token);

        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8080/images', {headers: {"Authorization": `Bearer ${token}`}});
                setImages(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching images:', error);
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div>
            <h1>Image Gallery</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {images.length === 0 ? (
                        <p>No images found</p>
                    ) : (
                        <div>
                            {images.map((image) => {
                                return (
                                    <Container key={image.id}>
                                        <Image src={`data:image/png;base64, ${image.imageData}`} alt={image.id}/>
                                        <p>{image.imageName}</p>
                                    </Container>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageComponent;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  padding-right: 24px;
  object-fit: contain;
`;