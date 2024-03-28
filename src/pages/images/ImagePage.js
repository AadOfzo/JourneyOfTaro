import React from "react";
import SImagePage from "./styles.ImagePage";

import ImageGallery from "../../components/images/ImageGallery";
import ImageHandler from "../../components/fileHandling/ImageHandler";

function ImagePage() {
    return (<main className="pages-main-container">
        <SImagePage>
            <ImageGallery/>
            <ImageHandler/>
        </SImagePage>
    </main>);
}

export default ImagePage;