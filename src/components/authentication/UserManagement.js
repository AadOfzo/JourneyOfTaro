import React, { useState, useEffect, useRef } from 'react';
import UserComponent from "../../configs/users/UserComponent";
import UserDetails from "../../configs/users/UserDetails";
import { UserImage, NoImageContainer, NoImageIcon, UploadButton, UserListContainer, CenteredH2, UserDetailsContainer, UserDetail, UserDetailLabel, UserDetailValue, ActionButton, ButtonsContainer } from '../../configs/users/styles.UserComponent';
import axios from "axios";
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

    const fetchUsers = () => {
        axios.get('http://localhost:8080/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    };

    useEffect(() => {
        if (selectedUserId) {
            axios.get(`http://localhost:8080/users/${selectedUserId}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error(`There was an error fetching the user with ID ${selectedUserId}!`, error);
                });
        }
    }, [selectedUserId]);

    const handleUserChange = (event) => {
        setSelectedUserId(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUploadClick = () => {
        if (file && selectedUserId) {
            const formData = new FormData();
            formData.append('file', file);

            axios.post(`http://localhost:8080/users/${selectedUserId}/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(response => {
                    setUser(response.data);
                    setFile(null);
                })
                .catch(error => {
                    console.error('There was an error uploading the image!', error);
                });
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

    const grantAdminRights = (username) => {
        axios.post(`http://localhost:8080/users/${username}/authorities`, {
            authority: 'ROLE_ADMIN'
        })
            .then(response => {
                if (response.status === 204) {
                    alert('Admin rights granted successfully!');
                    fetchUsers();
                } else {
                    alert('Failed to grant admin rights.');
                }
            })
            .catch(error => console.error('Error granting admin rights:', error));
    };

    const deleteUser = (username) => {
        axios.delete(`http://localhost:8080/users/${username}`)
            .then(response => {
                if (response.status === 204) {
                    alert('User deleted successfully!');
                    fetchUsers();
                } else {
                    alert('Failed to delete user.');
                }
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <UserListContainer>
            <CenteredH2>User Management</CenteredH2>
            <UserList />
            <UserComponent onUserChange={handleUserChange} users={users} />
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
