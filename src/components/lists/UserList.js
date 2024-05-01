/*global user*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListsMainStyle.css';

function UserList() {
    const [users, setUsers] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({}); // Object to store selected roles for each user

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users');
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

    const handleRoleChange = (userId, role) => {
        setSelectedRoles(prevRoles => ({
            ...prevRoles,
            [userId]: role // Update selected role for the specific user
        }));
    };

    const grantAdminPrivilege = async (username) => {
        try {
            await axios.put(`http://localhost:8080/users/${username}/grant-admin`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Refresh the user list after granting admin privilege
            fetchUsers();
        } catch (error) {
            console.error('Error granting admin privilege:', error);
        }
    };

    <button onClick={() => grantAdminPrivilege(user.username)}>Add Admin</button>

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <table>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>User Image</th>
                    <th>User Image</th>
                    <th>API Key</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Country</th>
                    <th>Email</th>
                    <th>Artist name</th>
                    <th>Songs</th>
                    <th>Role</th>
                    <th>Add ADMIN rights</th>
                    <th>Delete User</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.file && <img src={user.image.imageUrl} alt={user.name}/>}</td>
                        <td>{user.userimage && <img src={user.userimage.url} alt="User Image" />}</td>
                        <td>{user.apikey}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.country}</td>
                        <td>{user.email}</td>
                        <td>{user.artistname}</td>
                        <td>{user.songTitle}</td>
                        <td>{user.roles}</td>
                        <td>
                            <button onClick={() => grantAdminPrivilege(user.username)}>Add Admin</button>
                        </td>
                        <td>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
