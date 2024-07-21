import React, { useState, useEffect, useRef } from 'react';
import UserComponent from "../../configs/users/UserComponent";
import UserDetails from "../../configs/users/UserDetails";
import { UserImage, UserListContainer, NoImageContainer, NoImageIcon, UploadButton } from '../../configs/users/styles.UserComponent';
import axios from "axios";

const UserProfile = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null); // State to hold the file
    const fileInputRef = useRef(null); // Ref to access the file input

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
                    setUser(response.data); // Refresh user data with the new image
                    setFile(null); // Clear the file input
                })
                .catch(error => {
                    console.error('There was an error uploading the image!', error);
                });
        }
    };

    const handleNoImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger file input click
        }
    };

    const renderUserImage = (imageUrl) => {
        if (imageUrl) {
            return <UserImage src={imageUrl} alt="User" />;
        } else {
            return (
                <NoImageContainer onClick={handleNoImageClick}>
                    <NoImageIcon />
                    <p>No user image</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <UploadButton onClick={handleUploadClick}>Upload Image</UploadButton>
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
