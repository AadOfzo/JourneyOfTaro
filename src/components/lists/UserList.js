import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ApiService from "../../configs/utilities/axios/ApiService";
import UserDetails from "../../configs/users/UserDetails";
import {
    UserSelect,
    CenteredH2,
    UserListContainer,
    UserDetailsContainer,
    UserListInnerContainer,
    AddAdminButton,
    UserDeleteButton,
    ButtonsContainer,
    UserSelectList,
    UserSelectItem,
    UserSelectHeader
} from './styles.UserList';
import { NoImageContainer, NoImageIcon, UploadButton, UserImage } from "../../configs/users/styles.UserComponent";

function UserList() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [ setErrorUsers ] = useState(null);
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [buttonText, setButtonText] = useState("Upload Image");

    // New state for the selected user's ID
    const [selectedUserId, setSelectedUserId] = useState(null);

    const fileInputRef = useRef(null);

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
                ApiService.getUserImage(user.userId)
                    .then(response => ({
                        userId: user.userId,
                        imageData: response.data,
                        mimeType: response.headers['content-type'] // Adjust the response structure if needed
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

    const handleNoImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setButtonText("Add Image");
    };

    const handleUploadClick = async () => {
        if (file && selectedUserId) {
            const formData = new FormData();
            formData.append('file', file); // 'file' must be the exact key expected by the backend

            try {
                const response = await ApiService.addUserImage(selectedUserId, formData);
                setUser(response.data); // Assuming the backend returns the updated user
                setFile(null);
            } catch (error) {
                console.error('Error uploading the image:', error);
            }
        }
    };

    const renderUserImage = (user) => {
        const imageUrl = images.find(image => image.userId === user.userId)?.imageData;
        const mimeType = images.find(image => image.userId === user.userId)?.mimeType;

        if (imageUrl) {
            return (
                <UserImage
                    src={`data:${mimeType};base64,${imageUrl}`}
                    alt="User"
                    onClick={handleNoImageClick}
                />
            );
        } else {
            return (
                <NoImageContainer
                    hasImage={!!file}
                    imageUrl={file ? URL.createObjectURL(file) : null}
                    onClick={handleNoImageClick}
                >
                    {!file && <NoImageIcon />}
                    <p>{!file ? 'No user image' : ''}</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <UploadButton file={file} onClick={handleUploadClick}>
                        {buttonText}
                    </UploadButton>
                </NoImageContainer>
            );
        }
    };

    const toggleExpand = (userId) => {
        setExpandedUserId(prevState => (prevState === userId ? null : userId));
        const selectedUser = users.find(u => u.userId === userId);
        setUser(selectedUser);
        setSelectedUserId(userId); // Set the selected user's ID
    };

    const grantAdminPrivilege = async (username) => {
        try {
            await ApiService.grantAdminPrivilege(username);
            fetchUsersAndImages(); // Refresh user list after updating privileges
        } catch (error) {
            console.error('Error granting admin privilege:', error);
        }
    };

    const deleteUser = async (username) => {
        try {
            await ApiService.deleteUser(username);
            fetchUsersAndImages(); // Refresh user list after deleting a user
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <UserListContainer>
            <CenteredH2>User List</CenteredH2>
            {loadingUsers ? (
                <p>Loading...</p>
            ) : (
                <UserListInnerContainer> {/* Flex container for static layout */}
                    <UserSelect>
                        <UserSelectHeader>Users</UserSelectHeader>
                        <UserSelectList as="table">
                            <tbody>
                            {users.map(user => (
                                <UserSelectItem
                                    as="tr"
                                    key={user.userId}
                                    onClick={() => toggleExpand(user.userId)}
                                    isActive={expandedUserId === user.userId}
                                >
                                    <td>{user.userId}</td>
                                    <td>{user.username}</td>
                                </UserSelectItem>
                            ))}
                            </tbody>
                        </UserSelectList>
                    </UserSelect>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {user && (
                            <>
                                <UserDetailsContainer>
                                    {renderUserImage(user)}
                                    <UserDetails user={user} />
                                </UserDetailsContainer>
                                <ButtonsContainer>
                                    <AddAdminButton onClick={() => grantAdminPrivilege(user.username)}>Grant Admin Rights</AddAdminButton>
                                    <UserDeleteButton onClick={() => deleteUser(user.username)}>Delete User</UserDeleteButton>
                                </ButtonsContainer>
                            </>
                        )}
                    </div>
                </UserListInnerContainer>
            )}
        </UserListContainer>
    );
}

export default UserList;
