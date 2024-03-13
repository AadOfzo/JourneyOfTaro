import React from 'react';
import './Samples.css'
import ImageForm from "../../components/forms/imageForm/ImageForm";
import SongForm from "../../components/forms/musicForm/SongForm";
import SongCollectionForm from "../../components/forms/musicForm/SongCollectionForm";
import AddSongForm from "../../components/forms/musicForm/AddSongForm";

function Samples() {
    return (
            <main className="pages-main-container">
                {/*<ImageForm />*/}
                {/*<SongForm />*/}
                {/*<SongCollectionForm />*/}
                <AddSongForm />
            </main>
    );
}

export default Samples;