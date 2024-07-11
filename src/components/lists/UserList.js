import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageForm from "../forms/imageForm/ImageForm";
import ApiService from "../../configs/utilities/axios/ApiService";
import {
    GlowingRow,
    UserImage as StyledUserImage,
    UserInfoContainer,
    UserInfo,
    ImageContainer,
    Image,
    ExpandableContent,
    ExpandButton,
    UserListContainer,
    UserDetailsContainer,
    CenteredH2,
    UserDetail,
    UserDetailLabel,
    UserDetailValue
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
            const usersResponse = await axios.get('http://localhost:8080/users/${userId}/image');
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
            return <StyledUserImage src={`data:${userImage.mimeType};base64,${userImage.imageData}`} alt="User Image" />;
        } else {
            return <ImageForm onImageUploaded={() => fetchUsersAndImages()} />;
        }
    };

    return (
        <>
            <CenteredH2>User List</CenteredH2>
            <UserListContainer>
                <UserInfoContainer>
                    {loadingUsers ? (
                        <p>Loading...</p>
                    ) : (
                        <UserInfo>
                            <table>
                                <tbody>
                                {users.slice(0, 10).map(user => (
                                    <React.Fragment key={user.userId}>
                                        <GlowingRow onClick={() => toggleExpand(user.userId)}>
                                            <td>{user.userId}</td>
                                            <td>{user.username}</td>
                                        </GlowingRow>
                                    </React.Fragment>
                                ))}
                                </tbody>
                            </table>
                        </UserInfo>
                    )}
                    {errorUsers && <p>{errorUsers}</p>}
                    {errorImages && <p>{errorImages}</p>}
                </UserInfoContainer>
                <UserDetailsContainer>
                    {users.map(user => (
                        <React.Fragment key={user.userId}>
                            {expandedUserId === user.userId && (
                                <ExpandableContent expanded={expandedUserId === user.userId}>
                                    <div>
                                        <ImageContainer>
                                            {getUserImage(user.userId)}
                                        </ImageContainer>
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
                                        <ExpandButton onClick={() => grantAdminPrivilege(user.username)}>Add Admin</ExpandButton>
                                    </div>
                                </ExpandableContent>
                            )}
                        </React.Fragment>
                    ))}
                </UserDetailsContainer>
            </UserListContainer>
        </>
    );
}

export default UserList;
