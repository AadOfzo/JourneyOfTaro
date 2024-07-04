import React from 'react';
import ContentContainer from "../../components/contentLayout/ContentContainer"
import OutlineLogo from "../../assets/images/svg/JourneyOfTaro_Logo_CompassOutline_V2.svg";
import SongList from "../../components/lists/SongList";
import MusicPlayerTop from "../../components/musicPlayer/MusicPlayerTop";
import UploadComponent from "../../components/fileHandling/UploadComponent";
import SongForm from "../../components/forms/musicForm/SongForm";
import UploadForm from "../../components/forms/uploadForm/UploadForm";
import MusicApp from "../../components/musicPlayer/MusicApp";
import SongListTest from "../../components/lists/Music/SongListTest";
import SongListComponent from "../../components/lists/SongList";
import SongCollectionList from "../../components/lists/Music/SongCollectionList";

function MusicPage() {
    return (
        <main className="pages-main-container">

            {/*<Player/>*/}
            {/*<UploadForm/>*/}
            <SongForm/>

            {/*<SongListComponent/>*/}
            <SongList/>
            <SongCollectionList/>


        </main>
    )
}

export default MusicPage;