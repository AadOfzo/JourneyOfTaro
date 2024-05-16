import React from "react";
import SImagePage from "./styles.ImagePage";

import ImageGallery from "../../components/images/ImageGallery";
import ImageHandler from "../../components/fileHandling/ImageHandler";
import ImageComponent from "../../components/images/ImageComponent";
import ImageForm from "../../components/forms/imageForm/ImageForm";

function ImagePage() {
    return (<main className="pages-main-container">
        <SImagePage>
            <ImageForm/>
            {/*<ImageComponent/>*/}
            {/*<ImageGallery/>*/}
            {/*<ImageHandler/>*/}
        </SImagePage>
    </main>);
}

export default ImagePage;