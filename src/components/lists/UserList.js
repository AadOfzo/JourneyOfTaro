import React, { useState, useEffect } from 'react';
import ApiService from "../../configs/utilities/axios/ApiService";
import ImageForm from "../forms/imageForm/ImageForm";
import {
    GlowingRow,
    UserInfoContainer,
    UserInfo,
    ExpandButton,
    CenteredH2,
    UserListContainer,
    UserDetailsContainer,
    UserDetail,
    UserDetailLabel,
    UserDetailValue,
    ImageContainer,
    Image,
} from './styles.UserList'; // Adjust import based on your project structure

function UserList() {
    const [users, setUsers] = useState([]);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [loadingUsers, setLoadingUsers] = useState(false); // Correct state setter for loadingUsers
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoadingUsers(true); // Start loading indicator
        try {
            const usersResponse = await ApiService.fetchUsers();
            setUsers(usersResponse.data || []); // Set users data

            // Fetch images for each user
            const imagePromises = usersResponse.data.map(user => fetchUserImage(user.userId));
            const fetchedImages = await Promise.all(imagePromises);
            setImages(fetchedImages);
        } catch (error) {
            console.error('Error fetching users and images:', error);
        } finally {
            setLoadingUsers(false); // Stop loading indicator
        }
    };

    const fetchUserImage = async (userId) => {
        try {
            const imageData = await ApiService.getUserImage(userId);
            return {
                userId: userId,
                imageData: imageData.imageData,
                mimeType: imageData.mimeType
            };
        } catch (error) {
            console.error(`Error fetching image for user ${userId}:`, error);
            return {
                userId: userId,
                error: error.message
            };
        }
    };

    const toggleExpand = (userId) => {
        setExpandedUserId(prevState => (prevState === userId ? null : userId));
    };

    const grantAdminPrivilege = async (username) => {
        try {
            await ApiService.grantAdminPrivilege(username);
            fetchUsers(); // Refresh user list after updating privileges
        } catch (error) {
            console.error('Error granting admin privilege:', error);
        }
    };

    const handleImageUploaded = () => {
        fetchUsers(); // Refresh user list after image upload
    };

    const getUserImage = (userId) => {
        const userImage = images.find(img => img.userId === userId);
        if (userImage && userImage.imageData) {
            return (
                <ImageContainer key={`image-${userId}`}>
                    <Image src={`data:${userImage.mimeType};base64,${userImage.imageData}`} alt="User Image" />
                </ImageContainer>
            );
        } else if (userImage && userImage.error) {
            return (
                <ImageContainer key={`image-${userId}`}>
                    <p>Error loading image: {userImage.error}</p>
                    {expandedUserId === userId && <ImageForm userId={userId} onImageUploaded={handleImageUploaded} />}
                </ImageContainer>
            );
        } else {
            return (
                <ImageContainer key={`image-${userId}`}>
                    <p>No image available</p>
                    {expandedUserId === userId && <ImageForm userId={userId} onImageUploaded={handleImageUploaded} />}
                </ImageContainer>
            );
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
                                            <UserInfoContainer>
                                                <UserInfo>
                                                    <UserDetail>
                                                        <UserDetailLabel>Role:</UserDetailLabel>
                                                        <UserDetailValue>{user.roles.join(', ')}</UserDetailValue>
                                                    </UserDetail>
                                                    <UserDetail>
                                                        <UserDetailLabel>API Key:</UserDetailLabel>
                                                        <UserDetailValue>{user.apikey}</UserDetailValue>
                                                    </UserDetail>
                                                    <UserDetail>
                                                        <UserDetailLabel>First Name:</UserDetailLabel>
                                                        <UserDetailValue>{user.firstname}</UserDetailValue>
                                                    </UserDetail>
                                                    <UserDetail>
                                                        <UserDetailLabel>Last Name:</UserDetailLabel>
                                                        <UserDetailValue>{user.lastname}</UserDetailValue>
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
                                                        <UserDetailValue>{user.artistname}</UserDetailValue>
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
