import React from 'react';
import './About.css'
import OutlineLogo from "../../assets/images/svg/JourneyOfTaro_Logo_CompassOutline_V2.svg";
import ContentContainer from "../../components/contentLayout/ContentContainer";

function About() {
    return (
        <main className="pages-main-container">
            <h1>About Page</h1>
            <ContentContainer
                layout={'text'}
                text={{
                    title: 'Welkom op de Fullstack Applicatie van Adrien',
                    content:
                        <>
                            <h3>Users</h3>
                            <p>
                                1. Een USER kan aangemaakt worden op de 'Start Tour' pagina.
                                2. Na het maken van een USER kan je inloggen en 'Images en Songs' uploaden via de 'Image en Music' pagina's.

                            </p>

                            <h3>Images</h3>
                            <p>
                                1. Wanneer je bent ingelogd kan je op de 'Image' pagina een 'Image' uploaden.
                            </p>

                            <h3>Songs</h3>
                            <p>
                                1. Wanneer je bent ingelogd kan je op de 'Music' pagina een 'Song' uploaden.
                            </p>
                        </>

                }}
                image={{
                    src: OutlineLogo,
                    alt: 'Outline logo'
                }}
                placeholder={{
                    title: 'Placeholder',
                    content: 'Bloep'
                }}
            />
        </main>
    );
}

export default About;