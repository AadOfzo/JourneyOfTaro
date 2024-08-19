// src/pages/Dashboard.js
import React, {useState} from 'react';
import UserManagement from '../../components/authentication/UserManagement';
import SongList from '../../components/lists/SongList';
import SongCollectionList from '../../components/lists/Music/SongCollectionList';
import ImageListBase64 from '../../components/images/ImageListBase64';
import {
    DashboardContainer,
    SectionSelect,
    Section,
    SectionButton
} from './styles.Dashboard';
import UserDetails2 from "../../components/users/UserDetails2";

function Dashboard() {
    const [selectedSection, setSelectedSection] = useState('User');

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    return (
        <main className="pages-main-container">
            <DashboardContainer>
                <SectionSelect>
                    <SectionButton
                        onClick={() => handleSectionChange('User')}
                        active={selectedSection === 'User'}
                    >
                        User
                    </SectionButton>
                    <SectionButton
                        onClick={() => handleSectionChange('Audio')}
                        active={selectedSection === 'Audio'}
                    >
                        Audio
                    </SectionButton>
                    <SectionButton
                        onClick={() => handleSectionChange('Image')}
                        active={selectedSection === 'Image'}
                    >
                        Images
                    </SectionButton>
                </SectionSelect>

                <Section>
                    {selectedSection === 'User' && (
                        <>
                            <UserManagement/>
                            {/*<UserDetails2/>*/}
                        </>
                    )}
                    {selectedSection === 'Audio' && (
                        <>
                            <SongList/>
                            <SongCollectionList/>
                        </>
                    )}
                    {selectedSection === 'Image' && <ImageListBase64/>}
                </Section>
            </DashboardContainer>
        </main>
    );
}

export default Dashboard;
