import React, {useEffect} from 'react';
import {useAuth} from '../../components/authentication/Auth';
import SongForm from '../../components/forms/musicForm/SongForm';
import SongList from '../../components/lists/SongList';
import SongCollectionList from '../../components/lists/Music/SongCollectionList';
import SMusicPage from "./styles.MusicPage";
import LoadingComponent from "../../components/loadingWheel/LoadingComponent";

function MusicPage() {
    const {user} = useAuth();

    useEffect(() => {
        console.log('User data:', user);
    }, [user]);

    if (!user) {
        return <LoadingComponent/>;
    }

    const isAdmin = user.roles.includes('ROLE_ADMIN');
    const isUser = user.roles.includes('ROLE_USER');

    return (
        <main className="pages-main-container">
            <SMusicPage>
                {isAdmin ? (
                    <>
                        <SongForm/>
                        <SongList/>
                        <SongCollectionList showActions={true} />
                    </>
                ) : (
                    isUser &&
                    <>
                        <h2>Upload Music</h2>
                        <SongForm/>
                        <div>
                            <SongCollectionList showActions={false} />
                        </div>
                    </>
                )}
            </SMusicPage>
        </main>
    );
}

export default MusicPage;
