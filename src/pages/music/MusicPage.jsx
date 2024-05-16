import React from 'react';
import ContentContainer from "../../components/contentLayout/ContentContainer"
import OutlineLogo from "../../assets/images/svg/JourneyOfTaro_Logo_CompassOutline_V2.svg";
import SongList from "../../components/lists/SongList";
import MusicPlayerTop from "../../components/musicPlayer/MusicPlayerTop";
import UploadComponent from "../../components/fileHandling/UploadComponent";
import SongForm from "../../components/forms/musicForm/SongForm";
import UploadForm from "../../components/forms/uploadForm/UploadForm";

function MusicPage() {
    return (
        <main className="pages-main-container">

            {/*<Player/>*/}
            {/*<UploadForm/>*/}
            <SongForm/>
            <MusicPlayerTop/>


            {/*<ContentContainer*/}
            {/*    layout={'text'}*/}
            {/*    text={{*/}
            {/*        title: 'Music',*/}
            {/*        content:*/}
            {/*        <>*/}
            {/*            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut*/}
            {/*                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco*/}
            {/*                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in*/}
            {/*                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat*/}
            {/*                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut*/}
            {/*        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco*/}
            {/*        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in*/}
            {/*        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat*/}
            {/*        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>*/}
            {/*        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut*/}
            {/*        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco*/}
            {/*        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in*/}
            {/*        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat*/}
            {/*        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>*/}
            {/*        </>*/}

            {/*    }}*/}
            {/*    image={{*/}
            {/*        src: OutlineLogo,*/}
            {/*        alt: 'Outline logo'*/}
            {/*    }}*/}
            {/*    placeholder={{*/}
            {/*        title: 'Placeholder',*/}
            {/*        content: 'Bloep'*/}
            {/*    }}*/}
            {/*/>*/}


            {/*<div>*/}
            {/*    <SongList/>*/}
            {/*</div>*/}

        </main>
    )
}

export default MusicPage;