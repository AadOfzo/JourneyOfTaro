import React from "react";
import SImagePage from "./styles.ImagePage";

import ImageGallery from "../../components/images/ImageGallery";
import ImageHandler from "../../components/fileHandling/ImageHandler";
import ImageComponent from "../../components/images/ImageComponent";
import ImageForm from "../../components/forms/imageForm/ImageForm";
import ImageListBase64 from "../../components/images/ImageListBase64";
import ImageGalleryWithUrls from "../../components/images/ImageGalleryWithUrls";

function ImagePage() {
    return (
        <div className="pages-main-container">
        <SImagePage>
            {/*<ImageForm/>*/}
            <ImageListBase64/>
            {/*<ImageComponent/>*/}
            {/*<ImageGallery/>*/}
            {/*<ImageGalleryWithUrls/>*/}
            {/*<ImageHandler/>*/}
        </SImagePage>
    </div>);
}

export default ImagePage;