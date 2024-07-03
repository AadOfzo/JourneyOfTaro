import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageForm from "../forms/imageForm/ImageForm";
import ApiService from "../../configs/utilities/axios/ApiService";
import {
    GlowingRow,
    UserImage as StyledUserImage,
} from './styles.UserList';

function UserList() {
    const [users, setUsers] = useState([]);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [errorUsers, setErrorUsers] = useState(null);
    const [images, setImages] = useState([]);
    const [errorImages, setErrorImages] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const response = await axios.get('http://localhost:8080/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setErrorUsers('Error fetching users. Please try again later.');
        } finally {
            setLoadingUsers(false);
        }
    };

    const fetchImages = async () => {
        try {
            const response = await ApiService.fetchImages();
            setImages(response.data); // Assuming response.data is an array of images
        } catch (error) {
            console.error('Error fetching images:', error);
            setErrorImages('Error fetching images. Please try again later.');
        }
    };

    const toggleExpand = (userId) => {
        setExpandedUserId(prevUserId => (prevUserId === userId ? null : userId));
    };

    const grantAdminPrivilege = async (username) => {
        try {
            await axios.post(`http://localhost:8080/users/${username}/authorities`, { authority: 'ROLE_ADMIN' }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchUsers(); // Refresh user list after updating privileges
        } catch (error) {
            console.error('Error granting admin privilege:', error);
        }
    };

    const getUserImage = (userId) => {
        const user = users.find(user => user.id === userId);
        if (!user || !user.userimage) {
            return <ImageForm onImageUploaded={fetchUsers} />;
        }

        const userImage = images.find(img => img.userId === userId);
        if (userImage) {
            return <StyledUserImage src={userImage.url} alt="User Image" />;
        } else {
            return <ImageForm onImageUploaded={fetchUsers} />;
        }
    };

    return (
        <div>
            <h2>User List</h2>
            {loadingUsers ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <tbody>
                    {users.map(user => (
                        <React.Fragment key={user.id}>
                            <GlowingRow onClick={() => toggleExpand(user.id)}>
                                <td>
                                    {getUserImage(user.id)}
                                </td>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                            </GlowingRow>
                            {expandedUserId === user.id && (
                                <tr>
                                    <td colSpan="3">
                                        <div>
                                            <p>API Key: {user.apikey}</p>
                                            <p>First Name: {user.firstname}</p>
                                            <p>Last Name: {user.lastname}</p>
                                            <p>Country: {user.country}</p>
                                            <p>Email: {user.email}</p>
                                            <p>Artist Name: {user.artistname}</p>
                                            <p>Songs: {user.songTitle}</p>
                                            <p>Role: {user.roles}</p>
                                            <button onClick={() => grantAdminPrivilege(user.username)}>Add Admin</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            )}
            {errorUsers && <p>{errorUsers}</p>}
            {errorImages && <p>{errorImages}</p>}
        </div>
    );
}

export default UserList;
