import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageForm from "../forms/imageForm/ImageForm";
import ApiService from "../../configs/utilities/axios/ApiService";
import {
    GlowingRow,
    UserInfoContainer,
    UserInfo,
    ExpandableContent,
    ExpandButton,
    CenteredH2,
    UserListContainer,
    UserDetailsContainer,
    UserDetail,
    UserDetailLabel,
    UserDetailValue,
    ImageContainer,
    Image
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
        if (userImage && userImage.imageData) {
            return (
                <ImageContainer>
                    <Image src={`data:${userImage.mimeType};base64,${userImage.imageData}`} alt="User Image" />
                </ImageContainer>
            );
        } else {
            return null; // No need to render ImageForm here
        }
    };

    return (
        <UserListContainer>
            <CenteredH2>User List</CenteredH2>
            {loadingUsers ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <tbody>
                    {users.map(user => (
                        <React.Fragment key={user.userId}>
                            <GlowingRow onClick={() => toggleExpand(user.userId)}>
                                <td>{getUserImage(user.userId)}</td>
                                <td>{user.userId}</td>
                                <td>{user.username}</td>
                            </GlowingRow>
                            {expandedUserId === user.userId && (
                                <tr>
                                    <td colSpan="3">
                                        <UserDetailsContainer>
                                            <ImageContainer>
                                                <ImageForm onImageUploaded={() => fetchUsersAndImages()} />
                                            </ImageContainer>
                                            <UserInfoContainer>
                                                <UserInfo>
                                                    <UserDetail>
                                                        <UserDetailLabel>Role:</UserDetailLabel>
                                                        <UserDetailValue>{user.roles}</UserDetailValue>
                                                    </UserDetail>
                                                    <UserDetail>
                                                        <UserDetailLabel>API Key:</UserDetailLabel>
                                                        <UserDetailValue>{user.apikey}</UserDetailValue>
                                                    </UserDetail>
                                                    <UserDetail>
                                                        <UserDetailLabel>First Name:</UserDetailLabel>
                                                        <UserDetailValue>{user.firstName}</UserDetailValue>
                                                    </UserDetail>
                                                    <UserDetail>
                                                        <UserDetailLabel>Last Name:</UserDetailLabel>
                                                        <UserDetailValue>{user.lastName}</UserDetailValue>
                                                    </UserDetail>
                                                    <UserDetail>
                                                        <UserDetailLabel>Country:</UserDetailLabel>
                                                        <UserDetailValue>{user.country}</UserDetailValue>
                                                    </UserDetail>
                                                    <UserDetail>
                                                        <UserDetailLabel>Email:</UserDetailLabel>
                                                        <UserDetailValue>{user.email}</UserDetailValue>
                                                    </UserDetail>
                                                    <UserDetail>
                                                        <UserDetailLabel>Artist Name:</UserDetailLabel>
                                                        <UserDetailValue>{user.artistName}</UserDetailValue>
                                                    </UserDetail>
                                                    <UserDetail>
                                                        <UserDetailLabel>Songs:</UserDetailLabel>
                                                        <UserDetailValue>{user.songTitle}</UserDetailValue>
                                                    </UserDetail>
                                                    <ExpandButton onClick={() => grantAdminPrivilege(user.username)}>
                                                        Add Admin
                                                    </ExpandButton>
                                                </UserInfo>
                                            </UserInfoContainer>
                                        </UserDetailsContainer>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            )}
        </UserListContainer>
    );
}

export default UserList;
