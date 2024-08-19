import React, { useEffect } from 'react';
import { useAuth } from '../../components/authentication/Auth';
import SongForm from '../../components/forms/musicForm/SongForm';
import SongList from '../../components/lists/SongList';
import SongCollectionList from '../../components/lists/Music/SongCollectionList';

function MusicPage() {
    const { user } = useAuth();

    useEffect(() => {
        console.log('User data:', user);
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const isAdmin = user.roles.includes('ROLE_ADMIN');
    const isUser = user.roles.includes('ROLE_USER');

    return (
        <main className="pages-main-container">
            {isAdmin ? (
                <>
                    <SongForm />
                    <SongList />
                    <SongCollectionList />
                </>
            ) : (
                isUser && <SongForm />
            )}
        </main>
    );
}

export default MusicPage;
