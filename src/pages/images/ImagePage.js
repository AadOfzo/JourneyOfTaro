import React from "react";
import SImagePage from "./styles.ImagePage";

import ImageGallery from "../../components/images/ImageGallery";
import ImageHandler from "../../components/fileHandling/ImageHandler";
import ImageComponent from "../../components/images/ImageComponent";

function ImagePage() {
    return (<main className="pages-main-container">
        <SImagePage>
            <ImageComponent/>
            {/*<ImageGallery/>*/}
            <ImageHandler/>
        </SImagePage>
    </main>);
}

export default ImagePage;