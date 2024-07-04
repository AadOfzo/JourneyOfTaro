import React from 'react';

import FileUploadComponent from "../../components/fileHandling/FileUploadComponent";
import ImageGallery from "../../components/images/ImageGallery";
import UploadComponent from "../../components/fileHandling/UploadComponent";
import ImageHandler from "../../components/fileHandling/ImageHandler";

function Samples() {
    return (
            <main className="pages-main-container">
                {/*<ImageForm />*/}
                {/*<SongForm />*/}
                {/*<SongCollectionForm />*/}
                {/*<AddSongForm />*/}
                <FileUploadComponent/>
            </main>
    );
}

export default Samples;