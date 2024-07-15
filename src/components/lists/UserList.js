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
        fetchUsersAndImages();
    }, []);

    const fetchUsersAndImages = async () => {
        setLoadingUsers(true);
        try {
            const usersResponse = await axios.get('http://localhost:8080/users');
            setUsers(usersResponse.data);

            // Fetch images for each user
            const imagePromises = usersResponse.data.map(user =>
                ApiService.getImageFromUser(user.userId)
                    .then(response => ({
                        userId: user.userId,
                        imageData: response.data,
                        mimeType: response.headers['content-type']
                    }))
            );
            const fetchedImages = await Promise.all(imagePromises);
            setImages(fetchedImages);
        } catch (error) {
            console.error('Error fetching users and images:', error);
            setErrorUsers('Error fetching users. Please try again later.');
            setErrorImages('Error fetching images. Please try again later.');
        } finally {
            setLoadingUsers(false);
        }
    };

    const toggleExpand = (userId) => {
        setExpandedUserId(prevState => (prevState === userId ? null : userId));
    };

    const grantAdminPrivilege = async (username) => {
        try {
            await axios.post(`http://localhost:8080/users/${username}/authorities`, { authority: 'ROLE_ADMIN' }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchUsersAndImages(); // Refresh user list after updating privileges
        } catch (error) {
            console.error('Error granting admin privilege:', error);
        }
    };

    const getUserImage = (userId) => {
        const userImage = images.find(img => img.userId === userId);
        console.log(userImage);
        if (userImage && userImage.imageData) {
            return <StyledUserImage src={`data:${userImage.mimeType};base64,${userImage.imageData}`} alt="User Image" />;
        } else {
            return <ImageForm onImageUploaded={() => fetchUsersAndImages()} />;
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
                        <React.Fragment key={user.userId}>
                            <GlowingRow onClick={() => toggleExpand(user.userId)}>
                                <td>
                                    <ImageForm onImageUploaded={() => fetchUsersAndImages()} />;
                                </td>
                                <td>{user.userId}</td>
                                <td>{user.username}</td>
                            </GlowingRow>
                            {expandedUserId === user.userId && (
                                <tr>
                                    <td colSpan="3">
                                        <div>
                                            <p>Role: {user.roles}</p>
                                            <p>API Key: {user.apikey}</p>
                                            <p>First Name: {user.firstName}</p>
                                            <p>Last Name: {user.lastName}</p>
                                            <p>Country: {user.country}</p>
                                            <p>Email: {user.email}</p>
                                            <p>Artist Name: {user.artistName}</p>
                                            <p>Songs: {user.songTitle}</p>
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