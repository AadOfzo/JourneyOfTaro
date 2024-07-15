import React from 'react';
// Pages
import './Home.css'
// Components
import PageMenu from "../../components/pageMenu/PageMenu";
// Assets
import OutlineLogo from "../../assets/images/svg/JourneyOfTaro_Logo_CompassOutline_V2.svg";
import GongLogo from "../../assets/images/svg/JavaneseGamelan_Logo_GongOutline.svg";
import FaceLogo from "../../assets/images/svg/JourneyOfTaro_Logo_PortraitOutline.svg";

function Home() {
    return (
        <>
            <main className="pages-main-container">

                <div className="page-menus-container">

                    <PageMenu
                        pageImage={OutlineLogo}
                        pageName="Images"
                        // pageItemOne="Global Elements"
                        // pageItemTwo="Javanese Gamelan"
                        // pageItemThree="DigiGam"
                    />

                    <PageMenu
                        pageImage={GongLogo}
                        pageName="Music"
                        // pageItemOne="Releases"
                        // pageItemTwo="Demo Upload"
                    />

                    <PageMenu
                        pageImage={FaceLogo}
                        pageName="About"
                        pageItemOne="Unused components"
                        // pageItemTwo="Work"
                    />

                </div>

            </main>
        </>
    );
}

export default Home;