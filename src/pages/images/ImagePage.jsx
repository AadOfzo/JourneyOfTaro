import React, {useEffect, useState} from "react";
import SImagePage from "./styles.ImagePage";

import ImageForm from "../../components/forms/imageForm/ImageForm";
import ImageGallery from "../../components/images/ImageGallery";
import ImageHandler from "../../components/fileHandling/ImageHandler";
import ImageComponent from "../../components/images/ImageComponent";
import ImageListBase64 from "../../components/images/ImageListBase64";
import ImageGalleryWithUrls from "../../components/images/ImageGalleryWithUrls";

function ImagePage() {

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('your-api-endpoint');
                const data = await response.json();
                if (Array.isArray(data.images)) {
                    setImages(data.images);
                } else {
                    console.error("Invalid images data from API");
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    return (<main className="pages-main-container">
        <SImagePage>
            <ImageForm/>
            {/*<ImageListBase64/>*/}
            {/*<ImageComponent/>*/}
            <ImageGallery images={images}/>
            {/*<ImageGalleryWithUrls/>*/}
            {/*<ImageHandler/>*/}
        </SImagePage>
    </main>);
}

export default ImagePage;