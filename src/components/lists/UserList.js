import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListsMainStyle.css';


function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        void fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users', {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('token')}`
                // }
            });
            console.log(response.data)
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const addUserAuthority = async (username, authority) => {
        try {
            await axios.post(`http://localhost:8080/users/${username}/authorities`, { authority }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Refresh the user list after adding the authority
            fetchUsers();
        } catch (error) {
            console.error('Error adding authority:', error);
        }
    };

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <table>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>API Key</th>
                    <th>Email</th>
                    <th>Artist Name</th>
                    {/*<th>Authorities</th>*/}
                    <th>Roles</th>
                    <th>Songs</th>
                    <th>Delete User</th>
                    <th>Add User Role</th>
                </tr>
                </thead>
                <tbody>
                {console.log(users)}
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.apikey}</td>
                        <td>{user.email}</td>
                        <td>{user.artistName}</td>
                        {/*<td>{user.authorities}</td>*/}
                        <td>{user.roles}</td>
                        <td>{user.songTitle}</td>
                        <td></td>
                        <td>
                            <button onClick={() => addUserAuthority(user.username, user.enabled(true), 'ROLE_ADMIN')}>
                                Add User Role
                            </button>
                        </td>
                        <td><button>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
