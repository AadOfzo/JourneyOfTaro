import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GetRequestPage.css';
import useUsers from "../../hooks/UseUsers";

function GetRequestPage() {
    const [ users, setUsers ] = useState([]);

    const url = 'http://localhost:8080/users'

    useEffect(() => {
        void fetchUsers()
    },[]);

    async function fetchUsers(){
        try {
            const response = await axios.get('http://localhost:8080/users/')
            console.log(response.data)
            setUsers(response.data);

        } catch (e) {
            console.error(e)
        }
    }

    // const {users} = useUsers('http://localhost:8080/users')

    // User information:
// Long id;
// String username;
// String password;
// Boolean enabled = true;
// String apikey;
// String email;
// String artistName;
// Set<Authority> authorities = new HashSet<>();
// List<Role> roles = new ArrayList<>();
// List<Song> songs;


    return (
        <div className="page-container">
            <h1>All Users</h1>
            <table>
                <thead>
                <tr>
                    <th>UserID</th>
                    <th>Username</th>
                    <th>Apikey</th>
                    <th>Name</th>
                    <th>Artistname</th>
                    <th>Songs</th>
                    <th>Email</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    // De key moet op het buitenste element staan en uniek zijn
                    return <tr key={user.id}>
                        <td>{user.id}</td>
                        {/*Even checken of er uberhaupt een file is, en zo ja, dan laten we hem zien!*/}
                        {/*<td>{user.file && <img src={user.file.url} alt={user.name}/>}</td>*/}
                        <td>{user.username}</td>
                        <td>{user.apikey}</td>
                        <td>{user.artistName}</td>
                        {/* Render songs here, assuming `songs` is an array */}
                        {/*<td>{user.songs && user.songs.map(song => song.name).join(', ')}</td>*/}
                        <td>{user.email}</td>
                        <td></td>
                        <td><button>Delete</button></td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default GetRequestPage;
