import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApiService from "../../configs/utilities/axios/ApiService";
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
} from './styles.UserList';
import ImageForm from "../forms/imageForm/ImageForm";

function UserList() {
    const [users, setUsers] = useState([]);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [ setErrorUsers ] = useState(null);
    const [images, setImages] = useState([]);

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
                        mimeType: response.mimeType // Assuming you adjust the response structure
                    }))
                    .catch(error => ({
                        userId: user.userId,
                        error: error.message // Capture error if image fetch fails
                    }))
            );
            const fetchedImages = await Promise.all(imagePromises);
            setImages(fetchedImages);
        } catch (error) {
            console.error('Error fetching users and images:', error);
            setErrorUsers('Error fetching users. Please try again later.');
        } finally {
            setLoadingUsers(false);
        }
    };

    const toggleExpand = (userId) => {
        setExpandedUserId(prevState => (prevState === userId ? null : userId));
    };

    const grantAdminPrivilege = async (username) => {
        try {
            await ApiService.grantAdminPrivilege(username);
            fetchUsersAndImages(); // Refresh user list after updating privileges
        } catch (error) {
            console.error('Error granting admin privilege:', error);
        }
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
                    <ImageForm userId={userId} /> {/* Render ImageForm if image fetch failed */}
                </ImageContainer>
            );
        } else {
            return (
                <ImageContainer key={`image-${userId}`}>
                    <p>No image available</p>
                    <ImageForm userId={userId} /> {/* Render ImageForm if no image found */}
                </ImageContainer>
            );
        }
    };

    return (
        <>

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
        </>
    );
}

export default UserList;
