import UserManagement from "../../components/authentication/UserManagement";
import SongList from "../../components/lists/SongList";
import SongCollectionList from "../../components/lists/Music/SongCollectionList";
import React from "react";
import ImageListBase64 from "../../components/images/ImageListBase64";

function Dashboard() {
    return (
        <main className="pages-main-container">

            {/*<UserProfile/>*/}
            <UserManagement/>

            {/*<SongList/>*/}
            {/*<SongCollectionList/>*/}
            {/*<UserList/>*/}

            {/*<ImageListBase64/>*/}

        </main>
    )
}

export default Dashboard;