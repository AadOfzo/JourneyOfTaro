import UserManagement from "../../components/authentication/UserManagement";
import SongList from "../../components/lists/SongList";
import SongCollectionList from "../../components/lists/Music/SongCollectionList";
import React from "react";

function Dashboard() {
    return (
        <main className="pages-main-container">

            // User Pages
            {/*<UserProfile/>*/}
            <UserManagement/>
            //

            // Song pages
            <SongList/>
            <SongCollectionList/>
            {/*<UserList/>*/}

        </main>
    )
}

export default Dashboard;