import React, { useState, useEffect, useRef } from 'react';
import UserComponent from "../../configs/users/UserComponent";
import UserDetails from "../../configs/users/UserDetails";
import { UserImage, NoImageContainer, NoImageIcon, UploadButton, UserListContainer } from '../../configs/users/styles.UserComponent';
import axios from "axios";

const UserProfile = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

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

    return (
        <UserListContainer>
            <UserComponent onUserChange={handleUserChange} users={users} />
            {user && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {renderUserImage(user.imageUrl)}
                    <UserDetails user={user} />
                </div>
            )}
        </UserListContainer>
    );
};

export default UserProfile;
