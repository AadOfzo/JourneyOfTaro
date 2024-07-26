import React, { useState, useEffect, useRef } from 'react';
import UserComponent from "../../configs/users/UserComponent";
import UserDetails from "../../configs/users/UserDetails";
import { UserImage, NoImageContainer, NoImageIcon, UploadButton, UserListContainer, CenteredH2, UserDetailsContainer, ActionButton, ButtonsContainer } from '../../configs/users/styles.UserComponent';
import ApiService from "../../configs/utilities/axios/ApiService";
import UserList from "../lists/UserList";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await ApiService.fetchUsers();
            setUsers(data);
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
        } catch (error) {
            console.error(`There was an error fetching the user with ID ${userId}!`, error);
        }
    };

    const handleUserChange = (event) => {
        setSelectedUserId(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUploadClick = async () => {
        if (file && selectedUserId) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const data = await ApiService.addUserImage(selectedUserId, file);
                setUser(data);
                setFile(null);
            } catch (error) {
                console.error('There was an error uploading the image!', error);
            }
        }
    };

    const handleNoImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const renderUserImage = (imageUrl) => {
        if (imageUrl) {
            return <UserImage src={imageUrl} alt="User" />;
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
                    <UploadButton file={file} onClick={handleUploadClick}>Upload Image</UploadButton>
                </NoImageContainer>
            );
        }
    };

    const grantAdminRights = async (username) => {
        try {
            await ApiService.grantAdminPrivilege(username);
            alert('Admin rights granted successfully!');
            fetchUsers();  // Refresh user list to reflect changes
        } catch (error) {
            console.error('Error granting admin rights:', error);
        }
    };

    const deleteUser = async (username) => {
        try {
            await ApiService.deleteUser(username);
            alert('User deleted successfully!');
            fetchUsers();  // Refresh user list to reflect changes
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <UserListContainer>
            <CenteredH2>User Management</CenteredH2>
            <UserList />
            {/*<UserComponent onUserChange={handleUserChange} users={users} />*/}
            {user && (
                <UserDetailsContainer>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {renderUserImage(user.imageUrl)}
                        <UserDetails user={user} />
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
