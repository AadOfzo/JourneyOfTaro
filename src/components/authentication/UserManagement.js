import React, { useState, useEffect, useRef } from 'react';
import UserDetails from "../../configs/users/UserDetails";
import { UserImage, NoImageContainer, NoImageIcon, UploadButton, UserListContainer, CenteredH2, UserDetailsContainer, ActionButton, ButtonsContainer } from '../../configs/users/styles.UserComponent';
import ApiService from "../../configs/utilities/axios/ApiService";
import UserList from "../lists/UserList";

const UserManagement = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [file, setFile] = useState(null);
    const [buttonText, setButtonText] = useState("Upload Image");
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await ApiService.fetchUsers();
            setSelectedUserId(data[0]?.id);  // Automatically select the first user
        } catch (error) {
            console.error('There was an error fetching the users!', error);
        }
    };

    useEffect(() => {
        if (selectedUserId) {
            fetchUserById(selectedUserId);
        }
    }, [selectedUserId]);

    const fetchUserById = async (userId) => {
        try {
            const data = await ApiService.fetchUserById(userId);
            setUser(data);

            const imageResponse = await ApiService.getUserImage(userId);
            const imageUrl = URL.createObjectURL(imageResponse.data);
            setUserImage(imageUrl);

        } catch (error) {
            console.error(`There was an error fetching the user with ID ${userId}!`, error);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setButtonText("Add Image");
    };

    const handleUploadClick = async () => {
        if (file && selectedUserId) {
            try {
                const data = await ApiService.addUserImage(selectedUserId, file);
                setUser(data);
                setFile(null);
                setButtonText("Upload Image");
                fetchUserById(selectedUserId); // Refresh user image
            } catch (error) {
                console.error('There was an error uploading the image!', error);
            }
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const renderUserImage = () => {
        if (userImage) {
            return (
                <UserImage src={userImage} alt="User" onClick={handleImageClick} />
            );
        } else {
            return (
                <NoImageContainer onClick={handleImageClick}>
                    {!file && <NoImageIcon />}
                    <p>{!file ? 'No user image' : ''}</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {file && <UploadButton onClick={handleUploadClick}>{buttonText}</UploadButton>}
                </NoImageContainer>
            );
        }
    };

    const grantAdminRights = async (username) => {
        try {
            await ApiService.grantAdminPrivilege(username);
            alert('Admin rights granted successfully!');
            fetchUserById(selectedUserId);  // Refresh user details to reflect changes
        } catch (error) {
            console.error('Error granting admin rights:', error);
        }
    };

    const deleteUser = async (username) => {
        try {
            await ApiService.deleteUser(username);
            alert('User deleted successfully!');
            fetchUsers();  // Refresh user list to reflect changes
            setUser(null); // Reset the selected user after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <UserListContainer>
            <CenteredH2>User Management</CenteredH2>
            <UserList setSelectedUserId={setSelectedUserId} />
            {user && (
                <UserDetailsContainer>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {renderUserImage()}
                        <UserDetails user={user} imageUrl={userImage} />
                        <ButtonsContainer>
                            <ActionButton onClick={() => grantAdminRights(user.username)}>Grant Admin Rights</ActionButton>
                            <ActionButton onClick={() => deleteUser(user.username)}>Delete User</ActionButton>
                        </ButtonsContainer>
                    </div>
                </UserDetailsContainer>
            )}
        </UserListContainer>
    );
};

export default UserManagement;
