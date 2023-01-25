import React from 'react';
import SMusicPage from "./styles.MusicPage";
import PageMenu from "../../components/pageMenu/PageMenu";
import TextLogo from "../../assets/images/svg/JourneyOfTaro_Logo_Compass.svg";

function MusicPage() {
    return (
        <>
            <SMusicPage>
                <main className="music-page-main-container">
                    <PageMenu
                        pageImage={TextLogo}
                        pageName="Music"
                        pageItemOne="Releases"
                        pageItemTwo="Meditations"
                    />
                </main>
            </SMusicPage>
        </>
    );
}

export default MusicPage;